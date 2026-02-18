import axios from "axios";
import { CreatePostResponse, PostType } from "../types/Post";

export const createPost = async (token: string, msg: string): Promise<CreatePostResponse> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/post?token=${token}`;
    // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
    // (学習メモ): axiosがジェネリクスパラメータでdataにその型をセットしてくれる
    const res = await axios.post<CreatePostResponse>(url, {
      message: msg,
    });
    return res.data;

  } catch (error: unknown) {
    throw error;
  }
};

export const getList = async (token: string): Promise<PostType[]> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/post?records=20&token=${token}`;
    const res = await axios.get<PostType[]>(url);
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};
