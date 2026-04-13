import { Navigate, Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'

import SignIn from '../pages/SignIn'
import { useAuthStore } from '../store/useAuthStore'

const AppRoute = () => {
    const userInfo = useAuthStore((state) => state.userInfo)
    const loggedIn = userInfo.token !== "";
    // if (authLoading) {
    //     return <div>Loading...</div>
    // }
    return (
        <Routes>
            <Route path="/" element={loggedIn ? <Navigate replace to="/main" /> : <SignIn />} />
            <Route path="/main" element={loggedIn ? <Main /> : <Navigate replace to="/" />} />
            <Route path="*" element={<Navigate replace to={loggedIn ? "/main" : "/"} />} />
        </Routes>
    )
}

export default AppRoute