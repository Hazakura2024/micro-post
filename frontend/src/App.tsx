import "./App.css";
import { UserProvider } from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";
import { useAxiosIntercepter } from "./hooks/useAxiosIntercepter";

import AppRoute from "./components/AppRoute";

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
          <AppRoute></AppRoute>
        </AxiosIntercepterSetup>
      </UserProvider>
    </div>
  );
}

export default App;
