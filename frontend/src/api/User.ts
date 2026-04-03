import type { UserResponse } from "../types/User";
import { apiClient } from "../hooks/useAxiosIntercepter";

export const getUser = async (): Promise<UserResponse> => {

  const url = `/user/me`;
  const res = await apiClient.get<UserResponse>(url);
  console.log("getUser")
  console.log(res.data)
  return res.data;
  // NOTE: エラーは自動的にthrowされコンポーネント側でextractErrorMessageを使う

};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<UserResponse> => {

  const url = `/user/create`;
  const res = await apiClient.post<UserResponse>(url, {
    name: name,
    email: email,
    password: password,
  });
  console.log("createUser")
  console.log(res.data)
  return res.data;

};

export const editUser = async (name: string) => {

  const url = `/user/me`;
  const res = await apiClient.patch(url, {
    name: name,
  });
  console.log("editUser")
  console.log(res.data)
  return res.data;

}

export const uploadIcon = async (file: File) => {

  const formData = new FormData();
  formData.append("icon", file);

  const url = `/user/me/icon`;
  const res = await apiClient.patch(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  console.log("uploadIcon")
  console.log(res.data)
  return res.data;
}

export const getIcon = async () => {
  const url = `/user/me/icon`;

  const res = await apiClient.get(url);
  console.log("getIcon")
  console.log(res.data)
  return res.data;
}