import type { AuthResponse } from "../types/Auth";
import { apiClient } from "./axios";

export const signIn = async (userId: string, pass: string): Promise<AuthResponse> => {
  const res = await apiClient.post<AuthResponse>('/auth', {
    user_id: userId,
    password: pass,
  });
  return res.data;
};

// export const RefreshAuth = async (): Promise<AuthResponse> => {
//   const res = await apiClient.post<AuthResponse>('/auth/refresh')
//   return res.data;
// }
