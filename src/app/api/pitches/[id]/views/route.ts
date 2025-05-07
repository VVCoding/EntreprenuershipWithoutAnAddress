import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import pool from '@/lib/db';

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user type and ID from database
    const userResult = await pool.query(
      'SELECT id, user_type FROM users WHERE email = $1',
      [session.user.email]
    );

    if (!userResult.rows[0] || userResult.rows[0].user_type !== 'investor') {
      return NextResponse.json(
        { error: 'Only investors can view pitches' },
        { status: 403 }
      );
    }

    const pitchId = context.params.id;
    const userId = userResult.rows[0].id;

    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Try to insert a new view record
      const insertResult = await client.query(
        `INSERT INTO pitch_views (pitch_id, user_id)
         VALUES ($1, $2)
         ON CONFLICT (pitch_id, user_id) DO NOTHING
         RETURNING id`,
        [pitchId, userId]
      );

      // If a new view was recorded, update the pitch's view count
      if (insertResult.rows.length > 0) {
        const updateResult = await client.query(
          `UPDATE pitches 
           SET views = (
             SELECT COUNT(DISTINCT user_id) 
             FROM pitch_views 
             WHERE pitch_id = $1
           )
           WHERE id = $1 
           RETURNING views`,
          [pitchId]
        );

        if (updateResult.rows.length === 0) {
          throw new Error('Pitch not found');
        }

        await client.query('COMMIT');
        return NextResponse.json({ views: updateResult.rows[0].views });
      } else {
        // If no new view was recorded (investor already viewed), get current view count
        const viewCountResult = await client.query(
          `SELECT COUNT(DISTINCT user_id) as views
           FROM pitch_views 
           WHERE pitch_id = $1`,
          [pitchId]
        );

        await client.query('COMMIT');
        return NextResponse.json({ views: parseInt(viewCountResult.rows[0].views) });
      }
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 