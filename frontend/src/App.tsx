import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Main from "./pages/Main";
import { UserProvider } from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
