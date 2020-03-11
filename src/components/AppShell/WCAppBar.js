import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BookOutlined from "@material-ui/icons/BookOutlined";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/AppShell/WCAppBar.css";
import { palette } from "../../theme/colorPalette";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        zIndex: 200,
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        background: palette.appBar.background,
        color: palette.appBar.text,
        boxShadow: "0px 0px 10px 0px #e0e1e2"
    },
    menuButton: {
        marginRight: "0",
        opacity: 0.87
    },
    title: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyItems: "center"
    },
    titleSpan: {
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        opacity: 0.87
    }
}));

const WCAppBar = props => {
    const classes = useStyles();
    return (
        <div className={classes.root + " WCAppBar"}>
            <div>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit">
                        <BookOutlined />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Box component="span" className={classes.titleSpan}>
                            Vanpanda Quiz Card
                        </Box>
                    </Typography>
                    <Link to="/search">
                        <IconButton className={classes.menuButton} color="inherit">
                            <SearchIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </div>
        </div>
    );
};

export default WCAppBar;
