import axios from "axios";
import { User } from "../types/User";

export const getUser = async (id: number, token: string) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/user/${String(id)}?token=${token}`;
    const res = await axios.get<User>(url);
    console.log(res);
    return res.data;
};