import React, { useState, useMemo } from "react";
import AppShell from "./components/AppShell/AppShell";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import WCTheme from "./theme/WCTheme";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./components/context/AppContext";

function App() {
    const [appContext, setAppContext] = useState(null);
    const appContextValue = useMemo(() => {
        return {
            appContext,
            setAppContext
        }
    }, [appContext, setAppContext]);

    return (
        <div className="App">
            <AppContext.Provider value={appContextValue}>
                <MuiThemeProvider theme={WCTheme}>
                    <BrowserRouter>
                        <AppShell />
                    </BrowserRouter>
                </MuiThemeProvider>
            </AppContext.Provider>
        </div>
    );
}

export default App;
