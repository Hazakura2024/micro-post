import "./App.css";
import { ToastContainer } from "react-toastify";
import { useAxiosIntercepter } from "./hooks/useAxiosIntercepter";

import AppRoute from "./components/AppRoute";
import { useEffect, useRef } from "react";
import { useAuthStore } from "./store/useAuthStore";

const AxiosIntercepterSetup = ({ children }: { children: React.ReactNode }) => {
  // (学習メモ):  ここでフックを呼び出すことで、アプリ全体にインターセプターが適用される
  useAxiosIntercepter();
  return <>{children}</>
}

function App() {

  const bootstrappedRef = useRef(false)
  const initializedAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;

    void initializedAuth();
  }, [initializedAuth])

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
