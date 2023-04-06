import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Header></Header>
            {/* outlet works for render header children */}
            <Outlet></Outlet> 
        </div>
    );
};

export default Home;