import axios, { Axios, AxiosError } from "axios";
import { UserResponse } from "../types/User";

export const getUser = async (id: number, token: string): Promise<UserResponse> => {
    try {
        const API_URL = process.env.REACT_APP_API_URL;
        const url = `${API_URL}/user/${String(id)}?token=${token}`;
        const res = await axios.get<UserResponse>(url);
        console.log(res);
        return res.data;
    } catch (error) {
        throw new Error();
    }
};

export const createUser = async (name: string, email: string, password: string): Promise<UserResponse> => {
    try {
        const API_URL = process.env.REACT_APP_API_URL;
        const url = `${API_URL}/user`
        const res = await axios.post<UserResponse>(url, {
            "name": name,
            "email": email,
            "password": password
        });
        return res.data;
    } catch (error: unknown) {
        // NOTE: 1.ネットワークエラー（サーバー到達負荷の場合）
        if (error instanceof AxiosError && !error.response) {
            throw new Error('ネットワークに接続できません');
        }

        // NOTE: 2.HTTPエラー
        if (error instanceof AxiosError && error.response) {
            throw error;
        }

        // NOTE: その他の予期しないエラー
        throw new Error("予期しないエラーが発生")

    }
}
