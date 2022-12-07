import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {

        const res = await fetch('/users/add', {
            method: 'POST',
            body: JSON.stringify({

                Username: username,
                Password: password

            }),

            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }

        })
        const response = await res.json();
        if (response.errno === 1062) {
            alert("user already exists !!!")
        }
        if (response.errno === 200) {
            navigate('/')
        }
    }


    return (
        <div className='main-background'>
            <div className='form-container'>
                <span>Welcome to Fruit list 😋</span>
                <p>Please Register!!!</p>
                {
                    <form>
                        <input value={username} type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username'></input>
                        <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
                        <button onClick={register} >Register</button>
                    </form>
                }
            </div>
        </div>
    )
}