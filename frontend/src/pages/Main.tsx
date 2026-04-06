import { useContext } from "react";
import Layout from "../components/Layout";
import { PostListProvider } from "../providers/PostListProvider";

import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Main = () => {
  const { userInfo } = useContext(UserContext);
  const loggedIn = userInfo.token !== "";

  return (
    <>
      {loggedIn ? <PostListProvider><Layout></Layout ></PostListProvider > : <Navigate replace to="/" />
      }
    </>
  );
};

export default Main;
