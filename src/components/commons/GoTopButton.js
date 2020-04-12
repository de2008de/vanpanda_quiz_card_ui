import React from "react";
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from "@material-ui/core/styles";
import { borders } from "../../theme/colorPalette";

const useStyles = makeStyles(theme => ({
    buttonWrapper: {
        backgroundColor: "#fff",
        display: "inline-block",
        padding: "0.5rem",
        borderRadius: "20%",
        color: "#000",
        opacity: 0.87,
        border: borders.default
    }
}));

const ScrollableContainer = ".AppShell";
const scrollOptions = {
    top: 0,
    left: 0,
    behavior: 'smooth'
};

const GoTopButton = props => {
    const classes = useStyles();
    const onClickButtonHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector(ScrollableContainer).scrollTo(scrollOptions);
    };
    return (
        <div className={classes.buttonWrapper} onClick={onClickButtonHandler}>
            <PublishIcon />
        </div>
    );
};

export default GoTopButton;
