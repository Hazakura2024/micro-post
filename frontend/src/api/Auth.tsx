import axios from 'axios';
import { AuthResponse } from '../types/Auth';

const signIn = async (userId: string, pass: string) => {
  const url = `http://localhost:3000/auth?user_id=${userId}&password=${pass}`;
  console.log(url);
  const res = await axios.get<AuthResponse>(url);
  console.log(res);

  return res.data;
}

export default signIn;