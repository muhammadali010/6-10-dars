import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();



    function handleLogin(event) {
        event.preventDefault();



        const userCredentials = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        setIsLoading(true);
        axios.post(`https://trello.vimlc.uz/api/auth/login`, userCredentials, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.data.message === "success") {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));   
                    navigate("/");
                    emailInputRef.current.value = '';
                    passwordInputRef.current.value = '';
                }
            })
            .catch(err => {
                console.log(err.response);      
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className='bg-gray-50 border rounded-lg mx-auto border-gray-300 shadow-md w-1/3 mt-24 p-6'>
            <h2 className='text-center  text-blue-600 text-4xl mb-5 font-extrabold py-5'>Login</h2>
            <form className='flex flex-col items-center py-5'>
                <input  ref={emailInputRef} className='p-3 mb-3 border rounded-md w-full border-gray-300'  type="email"  placeholder='Enter  email...' />
                <input  ref={passwordInputRef} className='p-3 mb-3 border rounded-md w-full border-gray-300'  type="password"  placeholder='Enter  password...' />
                <button   disabled={isLoading} onClick={handleLogin}  className='bg-blue-600 text-white w-full p-2 rounded-md hover:bg-blue-700'  >  {isLoading ? "login.." : "Login"} </button>
                <Link className='mx-auto mt-2 hover:text-blue-500' to="/register">Register</Link>
            </form>
        </div>
    );
}

export default UserLogin;
