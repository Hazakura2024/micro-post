import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styled from "styled-components";

const SignInLayout = () => {
  return (
    <SPage>
      <SHero>
        <SBrand>MicroPost</SBrand>
        <SHeroTitle>軽く、速く、見やすいマイクロ掲示板</SHeroTitle>
        <SHeroLead>React×NestJSで作成した掲示板アプリです。CSSのみバイブコーディングしました。
        </SHeroLead>
      </SHero>
      <SAuthGrid>
        <SignIn></SignIn>
        <SignUp></SignUp>
      </SAuthGrid>
    </SPage>
  );
};

export default SignInLayout;

const SPage = styled.div`
  min-height: 100vh;
  padding: 32px 20px 48px;
  display: grid;
  gap: 24px;
`;

const SHero = styled.section`
  width: min(100%, 980px);
  margin: 0 auto;
  display: grid;
  gap: 10px;
  text-align: center;
`;

const SBrand = styled.div`
  display: inline-flex;
  justify-self: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(23, 106, 99, 0.12);
  color: #0f564f;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SHeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1.05;
`;

const SHeroLead = styled.p`
  margin: 0 auto;
  max-width: 62ch;
  color: var(--color-muted);
  line-height: 1.7;
`;

const SAuthGrid = styled.section`
  width: min(100%, 1160px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;