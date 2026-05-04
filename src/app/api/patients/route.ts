import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type PatientProfile = Database['public']['Tables']['patient_profile']['Row'];
type PatientQueryRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  status: string;
  created_at: string;
  patient_profile: PatientProfile;
};

// GET /api/patients — list all patients for the authenticated user's clinic
export async function GET(request: NextRequest) {
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

    const clinicId = currentUser.clinic_id;
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q');
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100);
    const offset = (page - 1) * limit;

    let query = supabase
      .from('app_user')
      .select(`
        id,
        first_name,
        last_name,
        email,
        phone,
        avatar_url,
        status,
        created_at,
        patient_profile!inner(
          dob,
          blood_group,
          height_cm,
          weight_kg,
          address,
          emergency_contact,
          previous_diseases,
          medical_notes
        )
      `, { count: 'exact' })
      .eq('clinic_id', clinicId)
      .eq('role', 'PATIENT')
      .order('first_name', { ascending: true })
      .range(offset, offset + limit - 1);

    // Apply search filter across first_name + last_name
    if (searchQuery) {
      const searchPattern = `%${searchQuery}%`;
      query = query.or(`first_name.ilike.${searchPattern},last_name.ilike.${searchPattern}`);
    }

    const { data: patients, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch patients', details: error.message }, { status: 500 });
    }

    // Flatten the response
    const formatted = patients?.map((p: PatientQueryRow) => ({
      id: p.id,
      name: `${p.first_name} ${p.last_name}`,
      email: p.email,
      phone: p.phone,
      avatar_url: p.avatar_url,
      status: p.status,
      created_at: p.created_at,
      profile: p.patient_profile,
    })) ?? [];

    return NextResponse.json({
      data: formatted,
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
