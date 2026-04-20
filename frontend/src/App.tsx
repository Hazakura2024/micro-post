import "./App.css";
import { ToastContainer } from "react-toastify";

import AppRoute from "./components/AppRoute";
import { useEffect, useRef } from "react";
import { useAuthStore } from "./store/useAuthStore";

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
      <AppRoute></AppRoute>
    </div>
  );
}

export default App;
