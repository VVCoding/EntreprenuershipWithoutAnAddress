import { type NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, password, userType, isGoogleUser } = await req.json();

    if (!email || (!isGoogleUser && !password)) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!userType || !['entrepreneur', 'investor'].includes(userType)) {
      return NextResponse.json(
        { error: 'Valid user type is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT email FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const passwordHash = isGoogleUser ? null : await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, user_type) VALUES ($1, $2, $3) RETURNING id, email, user_type',
      [email, passwordHash, userType]
    );

    const newUser = result.rows[0];
    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      userType: newUser.user_type,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
