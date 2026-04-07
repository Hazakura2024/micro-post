import styled from "styled-components";
import LogoutButton from "./parts/LogoutButton.tsx";
import EditNameSection from "./parts/EditNameSection.tsx";
import EditImageSection from "./parts/EditImageSection.tsx";

const Header = () => {

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRightItem>
        <EditNameSection />
        <EditImageSection />
        <LogoutButton />
      </SRightItem>
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

const SRightItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;



