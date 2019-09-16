import React from "react";
import AppShell from "./components/AppShell/AppShell";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import WCTheme from "./theme/WCTheme";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <MuiThemeProvider theme={WCTheme}>
                <BrowserRouter>
                    <AppShell />
                </BrowserRouter>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
