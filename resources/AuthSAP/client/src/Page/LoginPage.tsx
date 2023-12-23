import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export interface ILoginState {
    name:string,
    email: string,
    password: string
}
const LoginPage = () => {
    let navigate = useNavigate();

    const [loginData, setLoginData] =
        useState<ILoginState>({
        name: '',
        email: '',
        password: ''
    });

    const handleChangeName = (value:string) => {
        setLoginData(prevState => ({
            ...prevState,
            name: value
        }))
    }

    const handleChangeEmail = (value:string) => {
        setLoginData(prevState => ({
            ...prevState,
            email: value
        }))
    }

    const handleChangePassword = (value:string) => {
        setLoginData(prevState => ({
            ...prevState,
            password: value
        }))
    }

    const login = () => {
        axios.post('http://localhost:8000/api/login', loginData, {withCredentials: true})
            .then(function (response) {
                if (response.data.message) {
                    console.log("Успешная авторизация!");
                    navigate("/");
                    localStorage.setItem("auth", "success");
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    return (
        <div className="login">
            <h4>Имя</h4>
            <input
                className="login-input"
                type="text"
                onChange={(e) => handleChangeName(e.target.value)}/>
            <h4>Email</h4>
            <input
                className="login-input"
                type="text"
                onChange={(e) => handleChangeEmail(e.target.value)}/>
            <h4>Пароль</h4>
            <input
                className="login-input"
                type="password"
                onChange={(e) => handleChangePassword(e.target.value)}/>

            <button className="login-button" onClick={login}>Войти</button>
        </div>
    );
};

export default LoginPage;
