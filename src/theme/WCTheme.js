import { createMuiTheme } from "@material-ui/core/styles";

const WCTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "'Noto Sans SC', sans-serif"
    },
    palette: {
        primary: {
            light: "#e2f5fb",
            main: "#40A7DE",
            dark: "#255786",
            contrastText: "#fff"
        },
        secondary: {
            light: "#fbcd95",
            main: "#de7840",
            dark: "#d0643d",
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
