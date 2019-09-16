import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import { Link } from "react-router-dom";
import "../../assets/css/AppShell/WCAppFooter.css";

const WCAppFooter = () => {
    return (
        <div className="WCAppFooter">
            <Link to="/">
                <HomeIcon color="primary" />
            </Link>
            <Link to="/bookmarks">
                <BookmarksIcon color="primary" />
            </Link>
        </div>
    );
};

export default WCAppFooter;
