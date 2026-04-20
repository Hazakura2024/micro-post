import Layout from "../components/Layout";
import { PostListProvider } from "../providers/PostListProvider";

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


const Main = () => {
  const userInfo = useAuthStore((state) => state.userInfo)
  const loggedIn = userInfo.token !== "";

  return (
    <>
      {loggedIn ? <PostListProvider><Layout></Layout ></PostListProvider > : <Navigate replace to="/" />
      }
    </>
  );
};

export default Main;
