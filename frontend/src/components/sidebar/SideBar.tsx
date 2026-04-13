import styled from "styled-components";
import { CreatePostSection } from "./parts/createPostSection.tsx";

const SideBar = () => {

  return (
    <SSideBar>
      <SSideBarRow>新規投稿</SSideBarRow>
      <CreatePostSection />
    </SSideBar>
  );
};

export default SideBar;

const SSideBar = styled.div`
  padding: 8px;
`;

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`;

