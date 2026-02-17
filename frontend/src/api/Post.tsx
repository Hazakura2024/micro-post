import axios from 'axios'
import { PostType } from '../types/Post';

export const createPost = async (token: string, msg: string) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/post?token=${token}`;
    // (学習メモ): ここのvoidはレスポンスボディの型を指定しているだけで、resオブジェクト全体の型ではない。
    const res = await axios.post<void>(
        url,
        {
            message: msg,
        },
    );
    console.log(res.status);
}

export const getList = async (token: string) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/post?records=20&token=${token}`;
    const res = await axios.get<PostType[]>(url)
    return res.data;
}

