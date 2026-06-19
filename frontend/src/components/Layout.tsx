
import styled from "styled-components";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import Contents from "./contents/Contents"


const Layout = () => {
  return (
    <SLayoutShell>
      <SHeader>
        <Header></Header>
      </SHeader>
      <SBody>
        <SIntro>
          <SBadge>Dashboard</SBadge>
          <SHeadline>好きな話題についてポストを投稿しましょう！</SHeadline>
          <SLead>ポストの投稿、一覧、削除。名前の編集、アイコンの変更ができます。</SLead>
        </SIntro>
        <SGrid>
          <SSideBar>
          <SideBar></SideBar>
        </SSideBar>
          <SContents>
          <Contents></Contents>
          </SContents>
        </SGrid>
      </SBody>
    </SLayoutShell>
  );
};

const SLayoutShell = styled.div`
  min-height: 100vh;
  position: relative;
`;

const SHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0 0 20px;
  width: 100%;
  border-radius: 0;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(18px);
`;

const SBody = styled.div`
  width: min(100%, 1280px);
  margin: 0 auto;
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SIntro = styled.section`
  padding: 8px 4px 2px;
`;

const SBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SHeadline = styled.h1`
  margin: 12px 0 8px;
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  line-height: 1.15;
`;

const SLead = styled.p`
  margin: 0;
  max-width: 66ch;
  color: var(--color-muted);
`;

const SGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const SSideBar = styled.div`
  position: sticky;
  top: 108px;
  align-self: start;

  @media (max-width: 960px) {
    position: static;
  }
`;

const SContents = styled.div`
  min-width: 0;
`;

export default Layout;
