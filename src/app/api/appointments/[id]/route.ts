import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { AppointmentStatus } from '@/types/database';

// Allowed status transitions
const STATUS_TRANSITIONS: Record<string, string[]> = {
  SCHEDULED: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
  NO_SHOW: [],
};

const updateAppointmentSchema = z.object({
  status: z.nativeEnum(AppointmentStatus).optional(),
  start_time: z.string().datetime().optional(),
  end_time: z.string().datetime().optional(),
  notes: z.string().max(1000).nullable().optional(),
  doctor_id: z.string().uuid().nullable().optional(),
});

// PATCH /api/appointments/[id] — update appointment
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient() as any;
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: currentUser } = await supabase
      .from('app_user')
      .select('clinic_id')
      .eq('id', user.id)
      .single();

    if (!currentUser?.clinic_id) {
      return NextResponse.json({ error: 'No clinic associated' }, { status: 403 });
    }

    const { id } = await params;

    // Fetch the appointment to verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('appointment')
      .select('*')
      .eq('id', id)
      .eq('clinic_id', currentUser.clinic_id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateAppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Validate status transition if status is being changed
    if (parsed.data.status) {
      const allowed = STATUS_TRANSITIONS[existing.status] ?? [];
      if (!allowed.includes(parsed.data.status)) {
        return NextResponse.json(
          {
            error: 'Invalid status transition',
            details: `Cannot transition from ${existing.status} to ${parsed.data.status}`,
          },
          { status: 422 },
        );
      }
    }

    const { data: updated, error: updateError } = await supabase
      .from('appointment')
      .update(parsed.data)
      .eq('id', id)
      .eq('clinic_id', currentUser.clinic_id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update appointment', details: updateError.message }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

// DELETE /api/appointments/[id] — soft-delete (cancel) appointment
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient() as any;
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: currentUser } = await supabase
      .from('app_user')
      .select('clinic_id')
      .eq('id', user.id)
      .single();

    if (!currentUser?.clinic_id) {
      return NextResponse.json({ error: 'No clinic associated' }, { status: 403 });
    }

    const { id } = await params;

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('appointment')
      .select('id, status')
      .eq('id', id)
      .eq('clinic_id', currentUser.clinic_id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    if (existing.status === 'CANCELLED') {
      return NextResponse.json({ error: 'Appointment is already cancelled' }, { status: 409 });
    }

    const { error: cancelError } = await supabase
      .from('appointment')
      .update({ status: 'CANCELLED' as AppointmentStatus })
      .eq('id', id)
      .eq('clinic_id', currentUser.clinic_id);

    if (cancelError) {
      return NextResponse.json({ error: 'Failed to cancel appointment', details: cancelError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Appointment cancelled' });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
