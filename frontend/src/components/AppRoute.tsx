import { Navigate, Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'

import SignIn from '../pages/SignIn'
import { useAuthStore } from '../store/useAuthStore'

const AppRoute = () => {
    const token = useAuthStore((state) => state.token);
    const loggedIn = !!token;
    return (
        <Routes>
            <Route path="/" element={loggedIn ? <Navigate replace to="/main" /> : <SignIn />} />
            <Route path="/main" element={loggedIn ? <Main /> : <Navigate replace to="/" />} />
            <Route path="*" element={<Navigate replace to={loggedIn ? "/main" : "/"} />} />
        </Routes>
    )
}

export default AppRoute