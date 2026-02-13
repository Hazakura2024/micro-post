import axios from "axios";

export const getUser = async (id:number, token:string) => {
    const url = `http://localhost:3000/user/${String(id)}?token=${token}`;
    const res = await axios.get(url);
    console.log(res);
    return res.data;
};