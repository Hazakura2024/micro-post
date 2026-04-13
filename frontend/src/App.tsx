import "./App.css";
import { ToastContainer } from "react-toastify";
import { useAxiosIntercepter } from "./hooks/useAxiosIntercepter";

import AppRoute from "./components/AppRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

const AxiosIntercepterSetup = ({ children }: { children: React.ReactNode }) => {
  // (学習メモ):  ここでフックを呼び出すことで、アプリ全体にインターセプターが適用される
  useAxiosIntercepter();
  return <>{children}</>
}

function App() {
  const initializedAuth = useAuthStore((state) => state.initializeAuth)
  useEffect(() => { initializedAuth() }, [])

  return (
    <div className="App">
      <ToastContainer position="top-right" />

      <AxiosIntercepterSetup>
        <AppRoute></AppRoute>
      </AxiosIntercepterSetup>

    </div>
  );
}

export default App;
