import React from 'react';
import WCAppBar from './WCAppBar';
import WCRouter from '../Route/WCRouter';
import '../../assets/css/AppShell/AppShell.css';
import WCAppFooter from './WCAppFooter';

const AppShell = () => {
    return (
        <div className="AppShell">
            <WCAppBar />
            <WCRouter />
            <WCAppFooter />
        </div>
    );
}

export default AppShell;
