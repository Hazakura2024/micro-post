import axios from "axios";
import type { CreatePostResponse, PostType } from "../types/Post";

export const createPost = async (
  token: string,
  msg: string,
): Promise<CreatePostResponse> => {

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/post?token=${token}`;
  // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
  // (学習メモ): axiosがジェネリクスパラメータでdataにその型をセットしてくれる
  const res = await axios.post<CreatePostResponse>(url, {
    message: msg,
  });
  return res.data;

};

export const deletePost = async (id: number, token: string) => {

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/post/${id}?token=${token}`;
  // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
  // (学習メモ): axiosがジェネリクスパラメータでdataにその型をセットしてくれる
  const res = await axios.delete(url);
  return res.data;

};

export const getList = async (
  token: string,
  start: number = 0,
  records: number = 10,
  word?: string,
  user_name?: string,
): Promise<PostType[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/post?records=${records}&start=${start}&token=${token}${word ? "&word=" + encodeURIComponent(word) : ""}${user_name ? "&user_name=" + encodeURIComponent(user_name) : ""}`;
  const res = await axios.get<PostType[]>(url);
  return res.data;

};
