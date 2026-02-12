import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />}/>
      </Routes>
    </div>
  );
}

export default App;
