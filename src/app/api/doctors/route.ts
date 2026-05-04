import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/doctors — list all doctors for the authenticated user's clinic
export async function GET() {
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

    const clinicId = currentUser.clinic_id;

    // Fetch doctors belonging to this clinic with their profiles
    const { data: doctors, error } = await supabase
      .from('app_user')
      .select(`
        id,
        first_name,
        last_name,
        email,
        phone,
        avatar_url,
        status,
        doctor_profile!inner(
          specialization,
          years_of_experience,
          bio,
          languages_spoken,
          consultation_fee
        )
      `)
      .eq('clinic_id', clinicId)
      .eq('role', 'DOCTOR')
      .order('first_name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch doctors', details: error.message }, { status: 500 });
    }

    // Flatten the response
    const formatted = doctors?.map((d: any) => ({
      id: d.id,
      name: `${d.first_name} ${d.last_name}`,
      email: d.email,
      phone: d.phone,
      avatar_url: d.avatar_url,
      status: d.status,
      specialization: (d.doctor_profile as unknown as { specialization: string })?.specialization ?? null,
      years_of_experience: (d.doctor_profile as unknown as { years_of_experience: number })?.years_of_experience ?? null,
      bio: (d.doctor_profile as unknown as { bio: string | null })?.bio ?? null,
      languages_spoken: (d.doctor_profile as unknown as { languages_spoken: string[] })?.languages_spoken ?? [],
      consultation_fee: (d.doctor_profile as unknown as { consultation_fee: number })?.consultation_fee ?? 0,
    })) ?? [];

    return NextResponse.json(formatted);
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
