import React, { useState } from "react";
import vanpandaLogoSvg from "../../assets/svg/vanpanda_logo_no_bg.svg";
import { makeStyles, Typography } from "@material-ui/core";
import "../../assets/css/card/Flashcard.css";

const useStyles = makeStyles(theme => ({
    flashCard: {
        border: "solid 0.1rem gray",
        borderRadius: "2rem",
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        overflow: "hidden"
    },
    cardBackHeader: {
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
        height: "60%"
    },
    cardBackPicture: {
        width: "10rem"
    },
    cardBack: {
        transform: "rotateY(180deg)"
    },
    cardContent: {
        padding: "1rem",
        backgroundColor: "white",
        width: "100%",
    },
    cardBackContent: {
        position: "absolute",
        bottom: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        height: "40%"
    },
    cardFront: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: theme.palette.primary.light,
        display: "flex",
        alignItems: "center"
    },
    cardFrontContent: {
        height: "80%",
        overflow: "hidden"
    },
    cardParagraph: {
        overflowY: "auto",
        height: "100%"
    }
}));

const Flashcard = props => {
    const classes = useStyles();
    return (
        <div className="card-scene" id={props.id}>
            <div
                className={"FlashcardContainer " + (props.isFlipped ? "card-flipped" : "card-unflipped")}
                onClick={props.onClickHandler}
            >
                <div className={classes.flashCard + " " + classes.cardBack + " card-face"}>
                    <div className={classes.cardBackHeader}>
                        <img className={classes.cardBackPicture} src={vanpandaLogoSvg} alt="" />
                    </div>
                    <div className={classes.cardContent + " " + classes.cardBackContent}>
                        <Typography variant="h6" color="secondary">TERM</Typography>
                        <div className={classes.cardParagraph}>
                            {props.term}
                        </div>
                    </div>
                </div>
                <div className={classes.flashCard + " " + classes.cardFront + " card-face"}>
                    <div className={classes.cardContent + " " + classes.cardFrontContent}>
                        <Typography variant="h6" color="secondary">DEFINITION</Typography>
                        <div className={classes.cardParagraph}>
                            {props.definition}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;
