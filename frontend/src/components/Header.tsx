import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/User";
import styled from "styled-components";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserInfo({ id: 0, token: "" });
    navigate("/");
  };



  useEffect(() => {
    const getMyUser = async () => {
      try {
        const user = await getUser(userInfo.id, userInfo.token);
        setUserName(user.name);
      } catch (error: unknown) {
        const msg = extractErrorMessage(error, 'ユーザー情報が取得できません');
        toast.error(msg);
        setUserName("");
      }
    };
    // (学習メモ): useEffect 内で使う変数/関数は依存配列に入れるべき
    getMyUser();
  }, [userInfo.id, userInfo.token]);

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRgightItem>
        <SName>{userName}さん</SName>
        <SLogout onClick={onClickLogout}>ログアウト</SLogout>
      </SRgightItem>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.div`
  background-color: #00a3af;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #f8f8f8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`;

const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justify-content: start;
`;

const SRgightItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const SName = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
`;

const SLogout = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`;
