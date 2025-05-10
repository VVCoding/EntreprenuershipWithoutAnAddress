export interface Comment {
  id: string;
  pitchId: string;
  userId: string;
  userType: 'investor' | 'entrepreneur';
  content: string;
  createdAt: Date;
}

export interface CommentWithUser extends Omit<Comment, 'createdAt'> {
  userName: string | null;
  userImage: string | null;
  created_at: Date;
  user_id: string;
  user_type: 'investor' | 'entrepreneur';
} 