import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// Zod schema for creating an appointment
const createAppointmentSchema = z.object({
  patient_id: z.string().uuid('Invalid patient ID'),
  doctor_id: z.string().uuid('Invalid doctor ID').nullable().optional(),
  start_time: z.string().datetime('Invalid start time format'),
  end_time: z.string().datetime('Invalid end time format'),
  notes: z.string().max(1000, 'Notes too long').nullable().optional(),
});

// GET /api/appointments — list appointments for the authenticated user's clinic
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient() as any;
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user's clinic_id
    const { data: currentUser } = await (supabase as any)
      .from('app_user')
      .select('clinic_id')
      .eq('id', user.id)
      .single();

    if (!currentUser?.clinic_id) {
      return NextResponse.json({ error: 'No clinic associated' }, { status: 403 });
    }

    const clinicId = currentUser.clinic_id;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const doctorId = searchParams.get('doctor_id');

    let query = supabase
      .from('appointment')
      .select(`
        *,
        patient:app_user!appointment_patient_id_fkey(first_name, last_name),
        doctor:app_user!appointment_doctor_id_fkey(first_name, last_name)
      `)
      .eq('clinic_id', clinicId)
      .order('start_time', { ascending: true });

    if (status) query = query.eq('status', status.toUpperCase());
    if (doctorId) query = query.eq('doctor_id', doctorId);
    if (date) {
      const dayStart = `${date}T00:00:00Z`;
      const dayEnd = `${date}T23:59:59Z`;
      query = query.gte('start_time', dayStart).lte('start_time', dayEnd);
    }

    const { data: appointments, error } = await query;

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch appointments', details: error.message }, { status: 500 });
    }

    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

// POST /api/appointments — create a new appointment
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient() as any;
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's clinic_id
    const { data: currentUser } = await supabase
      .from('app_user')
      .select('clinic_id')
      .eq('id', user.id)
      .single();

    if (!currentUser?.clinic_id) {
      return NextResponse.json({ error: 'No clinic associated' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createAppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { data: appointment, error } = await supabase
      .from('appointment')
      .insert({
        clinic_id: currentUser.clinic_id,
        patient_id: parsed.data.patient_id,
        doctor_id: parsed.data.doctor_id ?? null,
        start_time: parsed.data.start_time,
        end_time: parsed.data.end_time,
        status: 'SCHEDULED',
        notes: parsed.data.notes ?? null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create appointment', details: error.message }, { status: 500 });
    }

    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
