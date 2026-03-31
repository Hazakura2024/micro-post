export type UserInfo = {
  id: number;
  name: string;
  icon_path: string | null;
  token: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  icon_path: string | null;
  created_at: Date;
};
