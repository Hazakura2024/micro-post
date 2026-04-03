import type { UserResponse } from "../types/User";
import { apiClient } from "../hooks/useAxiosIntercepter";

export const getUser = async (
  id: number,
  token: string,
): Promise<UserResponse> => {

  const url = `/user/${String(id)}`;
  const res = await apiClient.get<UserResponse>(url, {
    headers: {
      'Content-Type': 'application/json',
      'any-header': token,
    }
  });
  return res.data;
  // NOTE: エラーは自動的にthrowされコンポーネント側でextractErrorMessageを使う

};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<UserResponse> => {

  const url = `/user`;
  const res = await apiClient.post<UserResponse>(url, {
    name: name,
    email: email,
    password: password,
  });
  return res.data;

};

export const editUser = async (token: string, name: string) => {

  const url = `/user/me}`;
  const res = await apiClient.patch(url, {
    name: name,
  });
  return res.data;

}

export const uploadIcon = async (token: string, file: File) => {

  const formData = new FormData();
  formData.append("icon", file);

  const url = `/user/me/icon`;
  const res = await apiClient.patch(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return res.data;
}

export const getIcon = async (token: string) => {
  const url = `/user/me/icon`;

  const res = await apiClient.get(url);
  return res.data;
}