// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import ItemPage from './components/ItemPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import '../src/css/styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <>
            <Header />
            <main className="App">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/item" element={<ItemPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

export default App;
