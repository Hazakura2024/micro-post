import axios from "axios";
import type { UserResponse } from "../types/User";

export const getUser = async (
  id: number,
  token: string,
): Promise<UserResponse> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/user/${String(id)}?token=${token}`;
  const res = await axios.get<UserResponse>(url);
  return res.data;
  // NOTE: エラーは自動的にthrowされコンポーネント側でextractErrorMessageを使う

};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<UserResponse> => {

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/user`;
  const res = await axios.post<UserResponse>(url, {
    name: name,
    email: email,
    password: password,
  });
  return res.data;

};

export const editUser = async (token: string, name: string) => {

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/user/me?token=${token}`;
  const res = await axios.patch(url, {
    name: name,
  });
  return res.data;

}

export const uploadIcon = async (token: string, file: File) => {

  const formData = new FormData();
  formData.append("icon", file);

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/user/me/icon?token=${token}`;
  const res = await axios.patch(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return res.data;
}

export const getIcon = async (token: string) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/user/me/icon?token=${token}`;

  const res = await axios.get(url);
  return res.data;
}