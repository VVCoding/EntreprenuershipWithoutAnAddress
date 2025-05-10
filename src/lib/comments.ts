import pool from './db';
import { Comment, CommentWithUser } from '../types/comment';

export async function createComment(comment: Omit<Comment, 'id' | 'createdAt'>) {
  const newComment = {
    ...comment,
    id: crypto.randomUUID(),
    created_at: new Date(),
  };
  
  await pool.query(`
    INSERT INTO comments (id, pitch_id, user_id, user_type, content, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [
    newComment.id,
    newComment.pitchId,
    newComment.userId,
    newComment.userType,
    newComment.content,
    newComment.created_at
  ]);
  
  return newComment;
}

export async function getCommentsForPitch(pitchId: string, userId: string, userType: 'investor' | 'entrepreneur') {
  // First, get the pitch owner's ID
  const pitchResult = await pool.query(`
    SELECT user_id FROM pitches WHERE id = $1
  `, [pitchId]);

  if (!pitchResult.rows[0]) {
    throw new Error('Pitch not found');
  }

  const pitchOwnerId = pitchResult.rows[0].user_id;

  // Get comments based on user type and pitch ownership
  const result = await pool.query(`
    SELECT c.*, u.name as user_name, u.image as user_image
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.pitch_id = $1
    AND (
      c.user_id = $2  -- User's own comments
      OR (
        -- If user is investor, show entrepreneur comments
        ($3 = 'investor' AND c.user_type = 'entrepreneur')
        OR
        -- If user is entrepreneur and owns the pitch, show investor comments
        ($3 = 'entrepreneur' AND c.user_type = 'investor' AND $2 = $4)
      )
    )
    ORDER BY c.created_at ASC
  `, [
    pitchId,
    userId,
    userType,
    pitchOwnerId
  ]);

  console.log('Comments query result:', result.rows);

  return result.rows.map(comment => ({
    ...comment,
    userName: comment.user_name,
    userImage: comment.user_image,
  })) as CommentWithUser[];
}

export async function deleteComment(commentId: string, userId: string) {
  await pool.query(`
    DELETE FROM comments
    WHERE id = $1 AND user_id = $2
  `, [commentId, userId]);
} 