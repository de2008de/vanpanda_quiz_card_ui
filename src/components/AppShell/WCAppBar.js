import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../../assets/css/AppShell/WCAppBar.css";
import { palette } from "../../theme/colorPalette";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { isToggleOn } from "../../configs/FeatureToggle";

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
    const history = useHistory();

    const onClickArrowBackHandler = () => {
        history.goBack();
    };

    const renderSearchIcon = () => {
        if (!isToggleOn("SEARCH")) {
            return null;
        }
        return (
            <Link to="/search">
                <IconButton className={classes.menuButton} color="inherit">
                    <SearchIcon />
                </IconButton>
            </Link>
        );
    };

    return (
        <div className={classes.root + " WCAppBar"}>
            <div>
                <Toolbar>
                    <div onClick={onClickArrowBackHandler}>
                        <IconButton className={classes.menuButton} color="inherit">
                            <ArrowBackIcon />
                        </IconButton>
                    </div>
                    <Typography variant="h6" className={classes.title}>
                        <Box component="span" className={classes.titleSpan}>
                            Quiz Card
                        </Box>
                    </Typography>
                    {renderSearchIcon()}
                </Toolbar>
            </div>
        </div>
    );
};

export default WCAppBar;
