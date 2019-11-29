import React from "react";
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    buttonWrapper: {
        backgroundColor: theme.palette.primary.main,
        display: "inline-block",
        padding: "0.5rem",
        borderRadius: "20%",
        color: theme.palette.primary.contrastText
    }
}));

const ScrollableContainer = ".AppShell";

const GoTopButton = props => {
    const classes = useStyles();
    const onClickButtonHandler = () => {
        document.querySelector(ScrollableContainer).scrollTo(0, 0);
    };
    return (
        <div className={classes.buttonWrapper} onClick={onClickButtonHandler}>
            <PublishIcon />
        </div>
    );
};

export default GoTopButton;