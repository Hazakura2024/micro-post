import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'
import { UserContext } from '../contexts/UserContext'
import SignIn from './SignIn'

const AppRoute = () => {
    const { userInfo, authLoading } = useContext(UserContext)
    const loggedIn = userInfo.token !== "";
    if (authLoading) {
        return <div>Loading...</div>
    }
    return (
        <Routes>
            <Route path="/" element={loggedIn ? <Navigate replace to="/main" /> : <SignIn />} />
            <Route path="/main" element={loggedIn ? <Main /> : <Navigate replace to="/" />} />
            <Route path="*" element={<Navigate replace to={loggedIn ? "/main" : "/"} />} />
        </Routes>
    )
}

export default AppRoute