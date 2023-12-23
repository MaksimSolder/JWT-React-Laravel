import React, {useEffect, useState} from 'react';
import axios from "axios";

const MainPage = () => {
    const [user, setUser] = useState({
        name: ''
    });
    useEffect(() => {
        if (localStorage.getItem('auth') === 'success') {
            axios.get('http://localhost:8000/api/user', { withCredentials: true })
                .then(function (response) {
                    setUser(response.data);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    }, [])
    return (
        <div className="home">
            {user.name}
        </div>
    );
};

export default MainPage;
