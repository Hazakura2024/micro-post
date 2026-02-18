import axios from "axios";
import { UserResponse } from "../types/User";

export const getUser = async (id: number, token: string): Promise<UserResponse> => {
    try {
        const API_URL = process.env.REACT_APP_API_URL;
        const url = `${API_URL}/user/${String(id)}?token=${token}`;
        const res = await axios.get<UserResponse>(url);
        console.log(res);
        return res.data;
    } catch (error: unknown) {
        throw error;
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
        throw error;
    }
}
