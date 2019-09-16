import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    badge: {
        padding: "0.2rem",
        borderRadius: "50%",
        width: "auto",
        minWidth: "1rem",
        height: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    badgePrimaryColor: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    badgeSecondaryColor: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    }
}));

const WCBadge = props => {
    const classes = useStyles();
    const color = props.color;
    const colorClass = color === "primary" ? classes.badgePrimaryColor : classes.badgeSecondaryColor;
    return <span className={classes.badge + " " + colorClass}>{props.content}</span>;
};

export default WCBadge;
