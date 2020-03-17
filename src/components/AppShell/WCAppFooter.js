import { makeStyles } from '@material-ui/core/styles';
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import EditIcon from '@material-ui/icons/Edit';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from '@material-ui/icons/Person';
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/AppShell/WCAppFooter.css";
import { palette } from "../../theme/colorPalette";

const useStyles = makeStyles(theme => ({
    WCAppFooter: {
        color: palette.appFooter.color
    }
}));

const WCAppFooter = () => {

    const classes = useStyles();

    return (
        <div className={"WCAppFooter " + classes.WCAppFooter}>
            {/* <Link to="/">
                <ExploreIcon color="inherit" />
            </Link> */}
            <Link to="/mycard">
                <HomeIcon color="inherit" />
            </Link>
            <Link to="/bookmarks">
                <BookmarksIcon color="inherit" />
            </Link>
            <Link to="/addStudyCard">
                <EditIcon color="inherit" />
            </Link>
            <Link to="/profile">
                <PersonIcon color="inherit" />
            </Link>
        </div>
    );
};

export default WCAppFooter;
