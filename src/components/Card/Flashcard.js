import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { borders } from "../../theme/colorPalette";
import "../../assets/css/card/Flashcard.css";

const useStyles = makeStyles(theme => ({
    flashCard: {
        border: borders.default,
        borderRadius: "2rem",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    },
    cardTitle: {
        color: "#000",
        opacity: "60%"
    },
    cardBack: {
        transform: "rotateY(180deg)"
    },
    cardContent: {
        padding: "1rem",
        backgroundColor: "#fff"
    },
    cardBackContent: {
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        height: "90%"
    },
    cardFront: {
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center"
    },
    cardFrontContent: {
        height: "90%",
        overflow: "hidden"
    },
    cardParagraph: {
        overflowY: "auto",
        height: "100%",
        color: "#000",
        opacity: "87%",
        marginTop: "0.5rem",
        whiteSpace: "pre-wrap"
    }
}));

const Flashcard = props => {
    const classes = useStyles();

    const renderImage = () => {
        if (!props.img) {
            return null;
        }
    
        return (
            <div>
                <img style={{width: "100%", height: "100%"}} src={props.img} referrerPolicy="no-referrer" alt="" />
            </div>
        );
    };

    return (
        <div className="card-scene" id={props.id}>
            <div
                className={"FlashcardContainer " + (props.isFlipped ? "card-flipped" : "card-unflipped")}
                onClick={props.onClickHandler}
            >
                <div className={classes.flashCard + " " + classes.cardBack + " card-face"}>
                    <div className={classes.cardContent + " " + classes.cardBackContent}>
                        <div className={classes.cardTitle}>
                            <Typography color="inherit">TERM</Typography>
                        </div>
                        <div className={classes.cardParagraph}>
                            {props.term}
                        </div>
                    </div>
                </div>
                <div className={classes.flashCard + " " + classes.cardFront + " card-face"}>
                    <div className={classes.cardContent + " " + classes.cardFrontContent}>
                        <div className={classes.cardTitle}>
                            <Typography color="inherit">DEFINITION</Typography>
                        </div>
                        <div className={classes.cardParagraph}>
                            {renderImage()}
                            {props.definition}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;
