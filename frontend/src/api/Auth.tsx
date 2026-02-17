import axios from 'axios';
import { AuthResponse } from '../types/Auth';

const signIn = async (userId: string, pass: string): Promise<AuthResponse> => {
  const API_URL = process.env.REACT_APP_API_URL;
  const url = `${API_URL}/auth?user_id=${userId}&password=${pass}`;
  const res = await axios.get<AuthResponse>(url);
  return res.data;
}

export default signIn;