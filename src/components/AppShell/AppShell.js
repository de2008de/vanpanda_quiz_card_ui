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
            {/* Provide a space buffer for app footer so we can ensure that users can always scroll to the bottom */}
            <div className="footer-space-buffer" style={{ height: "5rem" }}></div>
        </div>
    );
}

export default AppShell;
