import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import BookOutlined from "@material-ui/icons/BookOutlined";
import { Link } from "react-router-dom";
import "../../assets/css/AppShell/WCAppBar.css";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        zIndex: 200,
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%"
    },
    menuButton: {
        marginRight: "0"
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
        justifyItems: "center"
    }
}));

const WCAppBar = props => {
    const classes = useStyles();
    return (
        <div className={classes.root + " WCAppBar"}>
            <AppBar position="static">
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
            </AppBar>
        </div>
    );
};

export default WCAppBar;
