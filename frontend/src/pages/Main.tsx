import Layout from "../components/Layout";

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


const Main = () => {
  const userInfo = useAuthStore((state) => state.userInfo)
  const loggedIn = userInfo.token !== "";

  return (
    <>
      {loggedIn ? <Layout></Layout > : <Navigate replace to="/" />
      }
    </>
  );
};

export default Main;
