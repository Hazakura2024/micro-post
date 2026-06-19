import "./App.css";
import { ToastContainer } from "react-toastify";

import AppRoute from "./components/AppRoute";
import { useAuthInitialize } from "./hooks/useAuthInitialize";

function App() {
  const { isInitialized } = useAuthInitialize();
  if (!isInitialized) {
    return <div>認証情報を確認中</div>
  }

  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <AppRoute></AppRoute>
    </div>
  );
}

export default App;
