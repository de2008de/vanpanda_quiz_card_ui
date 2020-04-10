import { createMuiTheme } from "@material-ui/core/styles";

const WCTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "'Noto Sans SC', sans-serif"
    },
    palette: {
        primary: {
            light: "#58a5f0",
            main: "#0277bd",
            dark: "#004c8c",
            contrastText: "#fff"
        },
        secondary: {
            light: "#4aaca3",
            main: "#017c74",
            dark: "#004f49",
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
