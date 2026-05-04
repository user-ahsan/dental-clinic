import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/appointments/stats
 *
 * Returns dashboard aggregate counts for the authenticated user's clinic:
 * - today_count: appointments scheduled for today
 * - total_patients: total registered patients in the clinic
 * - pending_count: appointments with status SCHEDULED
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user's clinic_id
    const { data } = await supabase
      .from('app_user')
      .select('clinic_id')
      .eq('id', user.id)
      .single();

    const currentUser = data as { clinic_id: string } | null;

    if (!currentUser?.clinic_id) {
      return NextResponse.json({ error: 'No clinic associated' }, { status: 403 });
    }

    const clinicId = currentUser.clinic_id;

    // Build today's date range in UTC
    const today = new Date();
    const dayStart = today.toISOString().slice(0, 10) + 'T00:00:00Z';
    const dayEnd = today.toISOString().slice(0, 10) + 'T23:59:59Z';

    // Run all three aggregate queries in parallel
    const [
      { count: todayCount },
      { count: totalPatients },
      { count: pendingCount },
    ] = await Promise.all([
      // Today's appointments
      supabase
        .from('appointment')
        .select('*', { count: 'exact', head: true })
        .eq('clinic_id', clinicId)
        .gte('start_time', dayStart)
        .lte('start_time', dayEnd),

      // Total registered patients in clinic
      supabase
        .from('app_user')
        .select('*', { count: 'exact', head: true })
        .eq('clinic_id', clinicId)
        .eq('role', 'PATIENT'),

      // Pending (SCHEDULED) appointments
      supabase
        .from('appointment')
        .select('*', { count: 'exact', head: true })
        .eq('clinic_id', clinicId)
        .eq('status', 'SCHEDULED'),
    ]);

    return NextResponse.json({
      today_count: todayCount ?? 0,
      total_patients: totalPatients ?? 0,
      pending_count: pendingCount ?? 0,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
