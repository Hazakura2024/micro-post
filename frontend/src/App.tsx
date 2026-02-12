import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import { UserProvider } from './probviders/useProvider';

function App() {
  return (
    <div className="App">
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
