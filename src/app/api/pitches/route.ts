import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user type from database to ensure accuracy
    const userResult = await pool.query(
      'SELECT user_type FROM users WHERE email = $1',
      [session.user.email]
    );

    if (!userResult.rows[0]) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userType = userResult.rows[0].user_type;
    let query: string;
    let params: string[];

    if (userType === 'investor') {
      // For investors, get all pitches with user email
      query = `
        SELECT p.*, u.email as user_email 
        FROM pitches p 
        JOIN users u ON p.user_id = u.id 
        ORDER BY p.created_at DESC
      `;
      params = [];
    } else {
      // For entrepreneurs, get only their pitches
      query = `
        SELECT * FROM pitches 
        WHERE user_id = (SELECT id FROM users WHERE email = $1) 
        ORDER BY created_at DESC
      `;
      params = [session.user.email];
    }

    const result = await pool.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching pitches:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user type from database to ensure accuracy
    const userResult = await pool.query(
      'SELECT user_type FROM users WHERE email = $1',
      [session.user.email]
    );

    if (!userResult.rows[0] || userResult.rows[0].user_type !== 'entrepreneur') {
      return NextResponse.json(
        { error: 'Only entrepreneurs can create pitches' },
        { status: 403 }
      );
    }

    const { title, description, video_url, looking_for } = await req.json();

    // Validate required fields
    if (!title || !description || !video_url || !looking_for) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'Title, description, video URL, and looking for are required' },
        { status: 400 }
      );
    }

    // Insert new pitch
    const result = await pool.query(
      `INSERT INTO pitches (user_id, title, description, video_url, looking_for)
       VALUES ((SELECT id FROM users WHERE email = $1), $2, $3, $4, $5)
       RETURNING *`,
      [session.user.email, title, description, video_url, looking_for]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating pitch:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 