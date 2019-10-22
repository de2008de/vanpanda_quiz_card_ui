import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        borderStyle: "dashed",
        borderColor: "#bab4b2",
        borderWidth: "2px",
        width: "6rem",
        height: "4rem",
        textAlign: "left",
        lineHeight: "0.8rem",
        fontSize: "0.8rem",
        fontWeight: "bold",
        color: theme.palette.text.secondary,
        backgroundColor: "inherit",
        padding: "0.5rem",
        margin: "0.2rem",
        display: "inline-flex"
    },
    text: {
        textOverflow: "ellipsis",
        overflow: "hidden"
    }
}));

const ConceptCard = props => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <div className={classes.text}>
                {props.term}
            </div>
        </Card>
    );
};

export default ConceptCard;
