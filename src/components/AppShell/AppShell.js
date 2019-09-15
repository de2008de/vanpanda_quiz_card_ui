import React from 'react';
import WCAppBar from './WCAppBar';
import HomePage from '../Home/HomePage';
import '../../assets/css/AppShell/AppShell.css';

const AppShell = () => {
    return (
        <div className="AppShell">
            <WCAppBar />
            <HomePage />
        </div>
    );
}

export default AppShell;
