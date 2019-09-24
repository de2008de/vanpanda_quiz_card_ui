import { createMuiTheme } from "@material-ui/core/styles";

const WCTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "'Noto Sans SC', sans-serif"
    },
    palette: {
        primary: {
            light: "#def3f3",
            main: "#1cb9b6",
            dark: "#009a93",
            contrastText: "#fff"
        },
        secondary: {
            light: "#ffebee",
            main: "#b91c1f",
            dark: "#a30f13",
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
