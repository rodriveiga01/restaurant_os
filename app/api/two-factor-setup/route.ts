import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function POST(request: Request) {
  const { email, password, verificationCode, method } = await request.json();

  try {
    // Sign up the user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          two_factor_method: method,
          // You can add more custom user metadata here
        }
      }
    });

    if (error) {
      throw error;
    }

    // TODO: Implement 2FA setup logic (e.g., verify the code with the backend)
    // This is where you'd interact with your database or external 2FA service

    // Simulating a successful setup
    const success = true;

    if (success) {
      return NextResponse.json({ message: '2FA setup successful', user: data.user }, { status: 200 });
    } else {
      return NextResponse.json({ message: '2FA setup failed' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message || '2FA setup failed' }, { status: 400 });
  }
}