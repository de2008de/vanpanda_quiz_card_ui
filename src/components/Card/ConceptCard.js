import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        borderStyle: "dashed",
        borderColor: "#bab4b2",
        borderWidth: "2px",
        width: "5rem",
        height: "3rem",
        textAlign: "left",
        fontSize: "0.6rem",
        fontWeight: "bold",
        color: theme.palette.text.secondary,
        backgroundColor: "inherit",
        padding: "0.3rem",
        margin: "0.2rem",
        display: "inline-block"
    }
}));

const ConceptCard = props => {
    const classes = useStyles();
    return <Card className={classes.card}>{props.content}</Card>;
};

export default ConceptCard;
