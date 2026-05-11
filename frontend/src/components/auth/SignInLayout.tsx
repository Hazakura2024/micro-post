import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styled from "styled-components";

const SignInLayout = () => {
  return (
    <div>
      <SHeader>MicroPost</SHeader>
      <SignIn></SignIn>
      <SignUp></SignUp>
    </div>
  );
};

export default SignInLayout;

const SHeader = styled.h1`
  text-align: center;
`