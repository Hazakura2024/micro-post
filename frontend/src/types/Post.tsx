export type PostType = {
  id: number;
  user_id: number;
  user_name: string;
  user_icon: string;
  content: string;
  created_at: Date;
};

export type CreatePostResponse = {
  id: number;
  success: boolean;
};
