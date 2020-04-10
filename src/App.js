import React, { useState, useMemo } from "react";
import AppShell from "./components/AppShell/AppShell";
import { ThemeProvider } from '@material-ui/core/styles';
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
                <ThemeProvider theme={WCTheme}>
                    <BrowserRouter>
                        <AppShell />
                    </BrowserRouter>
                </ThemeProvider>
            </AppContext.Provider>
        </div>
    );
}

export default App;
