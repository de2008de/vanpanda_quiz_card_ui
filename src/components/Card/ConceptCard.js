import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        borderStyle: "dashed",
        borderColor: "#bab4b2",
        borderWidth: "2px",
        width: "5rem",
        height: "3rem",
        textAlign: "left",
        padding: "0.1rem",
        fontSize: "0.6rem",
        fontWeight: "bold",
        color: theme.palette.text.secondary,
        backgroundColor: "inherit"
    },
    button: {
        padding: "0",
        margin: "0.2rem"
    }
}));

const ConceptCard = props => {
    const classes = useStyles();
    return (
        <Button className={classes.button} size="small" color="primary">
            <Card className={classes.card}>{props.content}</Card>
        </Button>
    );
};

export default ConceptCard;
