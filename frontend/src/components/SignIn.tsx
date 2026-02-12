import React, { useState } from 'react'
import signIn from '../api/Auth'

const SignIn = () => {
  
  const [userId, setUserId] = useState('');
  const [pass, setPass] = useState('');

  const onSignClick = () => {
    console.log('onSignClick');
    signIn(userId, pass);
    
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