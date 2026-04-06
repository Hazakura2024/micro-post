import { useContext } from "react";
import Layout from "../components/Layout";
import { PostListProvider } from "../providers/PostListProvider";

import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Main = () => {
  const { authLoading, userInfo } = useContext(UserContext);
  const loggedIn = userInfo.token !== "";

  if (authLoading) {
    console.log('authLoading')
    return <div>Loading...</div>
  }

  return (
    <>
      {loggedIn ? <PostListProvider><Layout></Layout ></PostListProvider > : <Navigate replace to="/" />
      }
    </>
  );
};

export default Main;
