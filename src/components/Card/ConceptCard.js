import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        // borderStyle: "dashed",
        // borderColor: "#bab4b2",
        // borderWidth: "2px",
        background: "#fff",
        // background: "linear-gradient(to right, #ffffff 0%, #ffcc99 100%)",
        width: "6rem",
        padding: "0 0.5rem",
        height: "4rem",
        textAlign: "left",
        lineHeight: "0.8rem",
        fontSize: "1rem",
        // fontWeight: "bold",
        color: "inherit",
        // backgroundColor: "inherit",
        // padding: "0.5rem",
        margin: "0.2rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        lineHeight: "2rem",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        opacity: "60%"
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
