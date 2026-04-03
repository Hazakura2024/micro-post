import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Main from "./pages/Main";
import { UserProvider } from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";
import { useAxiosIntercepter } from "./hooks/useAxiosInterCepter";

const AxiosIntercepterSetup = ({ children }: { children: React.ReactNode }) => {
  // (学習メモ):  ここでフックを呼び出すことで、アプリ全体にインターセプターが適用される
  useAxiosIntercepter();
  return <>{children}</>
}

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <UserProvider>
        <AxiosIntercepterSetup>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </AxiosIntercepterSetup>
      </UserProvider>
    </div>
  );
}

export default App;
