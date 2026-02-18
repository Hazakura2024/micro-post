import axios from "axios";
import { AuthResponse } from "../types/Auth";

const signIn = async (userId: string, pass: string): Promise<AuthResponse> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/auth?user_id=${userId}&password=${pass}`;
    const res = await axios.get<AuthResponse>(url);
    return res.data;
  } catch (error: unknown) {
    // NOTE: エラーは自動的にthrowされコンポーネント側でextractErrorMessageを使う
    throw error;
  }
};

export default signIn;
