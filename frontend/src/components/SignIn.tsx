import React, { useContext, useState } from 'react'
import signIn from '../api/Auth'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../probviders/useProvider';

const SignIn = () => {

  const navigate = useNavigate();
  
  const [userId, setUserId] = useState('');
  const [pass, setPass] = useState('');
  const { setUserInfo } = useContext(UserContext)

  const onSignClick = async () => {
    const ret = await signIn(userId, pass);
    console.log(ret);
    if (ret && ret?.token) {
      navigate('/main')
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="id">ID</label>
        <input id='id' value={userId} type="text" onChange={(evt) => setUserId(evt.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id='password' value={pass} type="text" onChange={(evt) => setPass(evt.target.value)}/>
      </div>
      <div>
        <button type='button' onClick={onSignClick}>Login</button>
      </div>
    </div>
  )
}

export default SignIn