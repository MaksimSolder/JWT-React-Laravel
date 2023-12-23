import React, {useState} from 'react';
import axios from "axios";
import {ILoginState} from "./LoginPage";

const RegistrationPage = () => {
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

    const checkPassword = (password:string) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        return hasUppercase && hasNumber;
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
        if (checkPassword(loginData.password)) {
            axios.post('http://localhost:8000/api/register', loginData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("Пароль должен содержать заглавные буквы и цифры");
        }
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
                pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                onChange={(e) => handleChangeEmail(e.target.value)}/>
            <h4>Пароль</h4>
            <input
                className="login-input"
                type="password"
                onChange={(e) => handleChangePassword(e.target.value)}/>

            <button className="login-button" onClick={login}>Зарегестрироваться</button>
        </div>
    );
};

export default RegistrationPage;
