import type { CreatePostResponse, PostType } from "../types/Post";
import { apiClient } from "../hooks/useAxiosIntercepter";

export const createPost = async (
  msg: string,
): Promise<CreatePostResponse> => {
  // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
  // (学習メモ): axiosがジェネリクスパラメータでdataにその型をセットしてくれる
  const res = await apiClient.post<CreatePostResponse>(`/post`, {
    message: msg,
  });
  console.log("createPost")
  console.log(res.data)
  return res.data;

};

export const deletePost = async (id: number) => {
  // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
  // (学習メモ): axiosがジェネリクスパラメータでdataにその型をセットしてくれる
  const res = await apiClient.delete(`/post/${id}`);
  console.log("deletePost")
  console.log(res.data)
  return res.data;

};

export const getList = async (
  start: number = 0,
  records: number = 10,
  word?: string,
  user_name?: string,
): Promise<PostType[]> => {
  const url = `/post?records=${records}&start=${start}&${word ? "&word=" + encodeURIComponent(word) : ""}${user_name ? "&user_name=" + encodeURIComponent(user_name) : ""}`;
  const res = await apiClient.get<PostType[]>(url);
  console.log("getlist")
  console.log(res.data)
  return res.data;

};
