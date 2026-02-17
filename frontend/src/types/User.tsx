export type UserInfo = {
  id: number;
  token: string;
};

export type User = {
  id: number;
  name: string;
  hash: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};
