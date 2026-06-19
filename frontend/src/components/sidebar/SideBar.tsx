import styled from "styled-components";
import { CreatePostSection } from "./parts/createPostSection.tsx";

const SideBar = () => {
  return (
    <SSideBar>
      <SHead>
        <SBadge>Compose</SBadge>
        <SSideBarRow>新規投稿</SSideBarRow>
        <SLead>今考えていることをポストに投稿。</SLead>
      </SHead>
      <CreatePostSection />
    </SSideBar>
  );
};

export default SideBar;

const SSideBar = styled.div`
  padding: 20px;
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(18px);
`;

const SHead = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
`;

const SBadge = styled.div`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.14);
  color: #8a5200;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SSideBarRow = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const SLead = styled.p`
  margin: 0;
  color: var(--color-muted);
  line-height: 1.65;
`;

