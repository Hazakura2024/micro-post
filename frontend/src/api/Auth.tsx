import axios from 'axios';
import { AuthResponse } from '../types/Auth';

const signIn = async (userId: string, pass: string): Promise<AuthResponse> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/auth?user_id=${userId}&password=${pass}`;
    const res = await axios.get<AuthResponse>(url);
    return res.data;
  } catch (error : unknown) {
    throw new Error(`認証失敗: ${error}`);
  }
}

export default signIn;