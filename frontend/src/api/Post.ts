import axios from "axios";
import type { CreatePostResponse, PostType } from "../types/Post";
import { apiClient } from "../hooks/useAxiosIntercepter";

export const createPost = async (
  token: string,
  msg: string,
): Promise<CreatePostResponse> => {
  // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
  // (学習メモ): axiosがジェネリクスパラメータでdataにその型をセットしてくれる
  const res = await apiClient.post<CreatePostResponse>(`/post`, {
    message: msg,
  });
  return res.data;

};

export const deletePost = async (id: number) => {
  // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
  // (学習メモ): axiosがジェネリクスパラメータでdataにその型をセットしてくれる
  const res = await axios.delete(`/post/${id}`);
  return res.data;

};

export const getList = async (
  start: number = 0,
  records: number = 10,
  word?: string,
  user_name?: string,
): Promise<PostType[]> => {
  const url = `/post?records=${records}&start=${start}&${word ? "&word=" + encodeURIComponent(word) : ""}${user_name ? "&user_name=" + encodeURIComponent(user_name) : ""}`;
  const res = await axios.get<PostType[]>(url);
  return res.data;

};
