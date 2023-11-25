// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();
    const navigate = useNavigate();


    const handleLogin = async () => {
        // Call your backend API
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            login({ token: data.access_token, role: email === 'doctor@pets.com' ? 'doctor' : 'pet_owner' });

            // Redirect to the home page
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    const inputStyle = {
        width: '300px',
    };

    return (
        <div className='flex flex-col min-h-screen w-full items-center justify-center py-16'>
            <h1 className='text-white'>
                Log in to Pets
            </h1>
            <div>
                <p className='text-white'>Email</p>
                <div className='mt-2'>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border rounded-md px-1 py-1 mb-2'
                        style={inputStyle}
                    />
                </div>
                <p className='text-white'>Password</p>
                <div className='mt-2'>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border rounded-md px-1 py-1'
                        style={inputStyle}
                    />
                </div>
            </div>
            <button
                type='button'
                onClick={handleLogin}
                className='mt-4 rounded-md border bg-opacity-30 border-gray-700 bg-gray-900 p-2 px-2 text-sm text-white transition-all hover:bg-gray-900 hover:text-white'
            >
                Log In
            </button>
        </div>
    );
};

export default Login;