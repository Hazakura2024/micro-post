import axios from 'axios'

export const createPost = async (token: string, msg: string) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const url = `${API_URL}/post?token=${token}`;
    const res = await axios.post(
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
    const res = await axios.get(url)
    return res.data;
}

