import axios from "axios";

const post = async (user_id: string, token: string, msg: string) => {
  const data = {
    message: msg
  };
  const url = `http://localhost:3000/post?token=${token}`
  const res = await axios.post(url, data);
  console.log(res);
}