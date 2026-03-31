import axios from "axios";
import type { AuthResponse } from "../types/Auth";

const signIn = async (userId: string, pass: string): Promise<AuthResponse> => {

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/auth`;
  const res = await axios.post<AuthResponse>(url, {
    user_id: userId,
    password: pass,
  });
  return res.data;

};

export default signIn;
