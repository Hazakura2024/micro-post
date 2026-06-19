import "./App.css";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import AppRoute from "./components/AppRoute";
import { useAuthInitialize } from "./hooks/useAuthInitialize";

function App() {
  const { isInitialized } = useAuthInitialize();
  if (!isInitialized) {
    return (
      <SBootScreen>
        <SBootCard>
          <SBadge>MicroPost</SBadge>
          <SBootTitle>認証情報を確認中</SBootTitle>
          <SBootDescription>少しだけお待ちください。</SBootDescription>
        </SBootCard>
      </SBootScreen>
    );
  }

  return (
    <SAppShell className="App">
      <ToastContainer position="top-right" />
      <AppRoute></AppRoute>
    </SAppShell>
  );
}

export default App;

const SAppShell = styled.div`
  min-height: 100vh;
`;

const SBootScreen = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
`;

const SBootCard = styled.div`
  width: min(100%, 420px);
  padding: 28px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.16);
  backdrop-filter: blur(18px);
`;

const SBadge = styled.div`
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(23, 106, 99, 0.12);
  color: #0f766e;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SBootTitle = styled.h1`
  margin: 16px 0 8px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
`;

const SBootDescription = styled.p`
  margin: 0;
  color: var(--color-muted);
`;
