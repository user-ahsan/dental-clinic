import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// Duration mapping: service_type id → duration in minutes
const SERVICE_DURATION_MINUTES: Record<string, number> = {
  '1': 30, // General Checkup
  '2': 45, // Teeth Cleaning
  '3': 30, // Consultation
  '4': 60, // Emergency Care
};

const DEFAULT_DURATION_MINUTES = 30;

const bookingSchema = z.object({
  service_type: z.string().min(1, 'Service type is required'),
  appointment_date: z.string().min(1, 'Appointment date is required'),
  appointment_time: z.string().min(1, 'Appointment time is required'),
});

/** Convert "9:00 AM" style time string to 24-hour [hours, minutes] tuple */
function parseTime12h(timeStr: string): [number, number] {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) throw new Error(`Invalid time format: "${timeStr}". Expected format: "9:00 AM"`);

    let hours = parseInt(match[1]!, 10);
    const minutes = parseInt(match[2]!, 10);
    const meridiem = match[3]!.toUpperCase();

  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid time value: ${hours}:${minutes}`);
  }

  return [hours, minutes];
}

/** Combine YYYY-MM-DD date and 12h time into an ISO 8601 datetime string */
function buildDatetime(dateStr: string, timeStr: string): string {
  const [hours, minutes] = parseTime12h(timeStr);
  const paddedMonth = String(new Date(dateStr + 'T00:00:00Z').getUTCMonth() + 1).padStart(2, '0');
  const paddedDay = String(new Date(dateStr + 'T00:00:00Z').getUTCDate()).padStart(2, '0');
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  // Extract year from dateStr
  const [year] = dateStr.split('-');

  return `${year}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}:00Z`;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's clinic_id
    const { data } = await supabase
      .from('app_user')
      .select('clinic_id')
      .eq('id', user.id)
      .single();

    const currentUser = data as { clinic_id: string } | null;

    if (!currentUser?.clinic_id) {
      return NextResponse.json({ error: 'No clinic associated' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { service_type, appointment_date, appointment_time } = parsed.data!;

    // Compute start_time and end_time
    let startTime: string;
    try {
      startTime = buildDatetime(appointment_date, appointment_time);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid date/time', details: err instanceof Error ? err.message : 'Could not parse date/time' },
        { status: 400 },
      );
    }

    const durationMinutes = SERVICE_DURATION_MINUTES[service_type] ?? DEFAULT_DURATION_MINUTES;
    const startDate = new Date(startTime);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
    const endTime = endDate.toISOString();

    const { data: appointment, error } = await supabase
      .from('appointment')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({
        clinic_id: currentUser.clinic_id,
        patient_id: user.id,
        doctor_id: null,
        start_time: startTime,
        end_time: endTime,
        status: 'SCHEDULED' as const,
        notes: `Booking via public form — service_type: ${service_type}`,
      } as any)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create appointment', details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
