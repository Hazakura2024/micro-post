import { apiClient } from "../hooks/useAxiosIntercepter";
import type { AuthResponse } from "../types/Auth";

export const signIn = async (userId: string, pass: string): Promise<AuthResponse> => {
  const res = await apiClient.post<AuthResponse>('/auth', {
    user_id: userId,
    password: pass,
  });
  console.log("signIn")
  console.log(res.data)
  return res.data;
};

export const logout = async () => {
  await apiClient.delete('/auth/logout')
}
