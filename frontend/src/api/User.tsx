import axios from "axios";
import type { UserResponse } from "../types/User";

export const getUser = async (
  id: number,
  token: string,
): Promise<UserResponse> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const url = `${API_URL}/user/${String(id)}?token=${token}`;
    const res = await axios.get<UserResponse>(url);
    return res.data;
  } catch (error: unknown) {
    // NOTE: エラーは自動的にthrowされコンポーネント側でextractErrorMessageを使う
    throw error;
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<UserResponse> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const url = `${API_URL}/user`;
    const res = await axios.post<UserResponse>(url, {
      name: name,
      email: email,
      password: password,
    });
    return res.data;
  } catch (error: unknown) {
    // NOTE: エラーは自動的にthrowされコンポーネント側でextractErrorMessageを使う
    throw error;
  }
};

export const editUser = async (token: string, name: string) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const url = `${API_URL}/me?token=${token}`;
    const res = await axios.patch(url, {
      name: name,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}