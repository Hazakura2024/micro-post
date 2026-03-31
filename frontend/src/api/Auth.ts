import axios from "axios";
import type { AuthResponse } from "../types/Auth";

const signIn = async (userId: string, pass: string): Promise<AuthResponse> => {

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/auth?user_id=${userId}&password=${pass}`;
  const res = await axios.get<AuthResponse>(url);
  return res.data;

};

export default signIn;
