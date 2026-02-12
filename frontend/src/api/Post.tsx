import axios from 'axios'

export const createPost = async (token: string, msg: string) => {
    const url = `http://localhost:3000/post?token=${token}`;
    const res = await axios.post(
        url,
        {
            message: msg,
        },
    );
    console.log(res.status);
}

export const getList = async (token: string) => {
    const url = `http://localhost:3000/post?token=${token}`;
    const res = await axios.get(url)
    return res.data;
}