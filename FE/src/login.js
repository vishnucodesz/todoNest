import React, { useState, useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
// import { Register } from './register';
import './index.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    
    useEffect(()=> {
        const loginStatus = localStorage.getItem('loginStatus');
        if(loginStatus){
            navigate('/home');
        }
    
    },[userId])
    const  auth = async ()=> {

        await fetch('/users/auth/login', {
			method: 'POST',
			body: JSON.stringify({

                userName: username,
                password: password

			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			}
		}).then(res=> {return res.json()}).then(data=>{
            console.log(data);
            if(data){
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('userId', data);
                setUserId(data);
            }
            if(!data)
            {return alert('Invalid credentials !!!!')}
        })
        
        
    }
    return (
        <div className='main-background'>
            <div className='form-container'>
                <span>Welcome to Fruit list 😋</span>
                <p>Please login to go to home page !!!</p>
                <form>
                    <input value={username} type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Username'></input>
                    <input value={password} type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password'></input>
                    <button onClick={auth}>Login</button>
                    <Link className='register' to={'/register'}>New user ? Please register !!!</Link>
                </form>
            </div>
        </div>
    )
}
export default Login;