
import type { AuthResponse } from "../types/Auth";
import { apiClient } from "./axiosIntercepter";

export const signIn = async (user_id: string, pass: string): Promise<AuthResponse> => {
  const res = await apiClient.post<AuthResponse>('/auth', {
    user_id: user_id,
    password: pass,
  });
  console.log("signIn")
  console.log(res.data)
  return res.data;
};

export const logout = async () => {
  await apiClient.delete('/auth/logout')
}
