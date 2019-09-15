import React from "react";
import AppShell from "./components/AppShell/AppShell";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import WCTheme from './theme/WCTheme';

function App() {
    return (
        <div className="App">
            <MuiThemeProvider theme={WCTheme}>
                <AppShell />
            </MuiThemeProvider>
        </div>
    );
}

export default App;
