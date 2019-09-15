import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import BookOutlined from "@material-ui/icons/BookOutlined";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: "0"
    },
    title: {
        flexGrow: 1
    }
}));

const WCAppBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit">
                        <BookOutlined />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Box>大温熊猫读书</Box>
                    </Typography>
                    <IconButton className={classes.menuButton} color="inherit">
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default WCAppBar;
