import { createMuiTheme } from "@material-ui/core/styles";

const WCTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "'Noto Sans SC', sans-serif"
    },
    palette: {
        primary: {
            light: "#50c5f7",
            main: "#00abf4",
            dark: "#008ad1",
            contrastText: "#fff"
        },
        secondary: {
            light: "#ff6a34",
            main: "#f44900",
            dark: "#d93a00",
            contrastText: "#fff"
        },
        error: {
            light: "#fc3f5f",
            main: "#f40045",
            dark: "#d50036",
            contrastText: "#fff"
        }
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
