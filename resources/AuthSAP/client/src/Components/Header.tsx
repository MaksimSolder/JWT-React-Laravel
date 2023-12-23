import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Header = () => {
    const authToken = localStorage.getItem("auth");
    const [logouts, setLogouts] = useState<boolean>(false);
    const logout = () => {
        axios.post('http://localhost:8000/api/logout',{}, {withCredentials: true})
            .then(function (response) {
                console.log(response.data);
                localStorage.clear();
                setLogouts(prevState => !prevState);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }
    return (
        <div className="header">
            <h2>JWT AUTH</h2>
            <Link to="/" className="header-link">Главная</Link>
            {authToken === 'success' ?
                <>
                    <button onClick={logout}>Выйти</button>
                </> :
                <>
                    <Link to="/login" className="header-link">Войти</Link>
                    <Link to="/register" className="header-link">Регистрация</Link>
                </>
            }
        </div>
    );
};

export default Header;
