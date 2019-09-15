import { createMuiTheme } from "@material-ui/core/styles";

const WCTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: {
            light: "#54d2e3",
            main: "#24bed6",
            dark: "#1d99a9",
            contrastText: "#fff"
        },
        secondary: {
            light: "#f2492d",
            main: "#d63b24",
            dark: "#bc2f1b",
            contrastText: "#fff"
        },
        error: {
            light: "#f96c77",
            main: "#ff0736",
            dark: "#d2001a",
            contrastText: "#fff"
        }
    },
    typography: {
        fontFamily: "'Noto Sans SC', sans-serif"
    },
    shape: {
        borderRadius: 8
    },
    overrides: {
        MuiDrawer: {
            paper: {
                minWidth: 256
            },
            paperAnchorDockedLeft: {
                borderRight: "none"
            }
        }
    }
});

export default WCTheme;
