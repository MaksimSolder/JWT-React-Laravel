import React from 'react';
import Header from "./Components/Header";
import {Route, Router, Routes} from "react-router-dom";
import MainPage from "./Page/MainPage";
import LoginPage from "./Page/LoginPage";
import RegistrationPage from "./Page/RegistrationPage";

function App() {

  return (

    <div className="App">
        <Header/>
        <Routes>
        <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
        </Routes>
    </div>
  );
}

export default App;
