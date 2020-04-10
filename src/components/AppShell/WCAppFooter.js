import { makeStyles } from '@material-ui/core/styles';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditIcon from '@material-ui/icons/Edit';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from "@material-ui/icons/Home";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import React, { useState } from "react";
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

    const [activeButton, setActiveButton] = useState(0);

    const onClickButtonHandler = index => {
        return () => {
            setActiveButton(index);
        };
    };

    return (
        <div className={"WCAppFooter " + classes.WCAppFooter}>
            <Link to="/mycard" onClick={onClickButtonHandler(0)}>
                {activeButton ===  0 ? <HomeIcon color="inherit" /> : <HomeOutlinedIcon color="inherit" />}
            </Link>
            <Link to="/bookmarks" onClick={onClickButtonHandler(1)}>
                {activeButton ===  1 ? <BookmarkIcon color="inherit" /> : <BookmarkBorderOutlinedIcon color="inherit" />}
            </Link>
            <Link to="/addStudyCard" onClick={onClickButtonHandler(2)}>
                {activeButton ===  2 ? <EditIcon color="inherit" /> : <EditOutlinedIcon color="inherit" />}
            </Link>
            <Link to="/profile" onClick={onClickButtonHandler(3)}>
                {activeButton ===  3 ? <PersonIcon color="inherit" /> : <PersonOutlineOutlinedIcon color="inherit" />}
            </Link>
        </div>
    );
};

export default WCAppFooter;
