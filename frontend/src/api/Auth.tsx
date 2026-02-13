import axios from 'axios';
import { AuthResponse } from '../types/Auth';

const signIn = async (userId: string, pass: string) => {
  const url = `http://localhost:3000/auth?user_id=${userId}&password=${pass}`;
  const res = await axios.get<AuthResponse>(url);
  return res.data;
}

export default signIn;