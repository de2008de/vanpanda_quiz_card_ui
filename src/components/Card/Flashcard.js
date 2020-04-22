import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { borders } from "../../theme/colorPalette";
import "../../assets/css/card/Flashcard.css";

const useStyles = makeStyles(theme => ({
    flashCard: {
        border: borders.default,
        borderRadius: "2rem",
        overflow: "hidden"
    },
    cardTitle: {
        color: "#000",
        opacity: 0.6
    },
    cardContent: {
        padding: "1rem",
        backgroundColor: "#fff",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
    },
    cardParagraph: {
        overflowY: "auto",
        height: "50vh",
        color: "#000",
        opacity: 0.87,
        marginTop: "0.5rem",
        whiteSpace: "pre-wrap"
    }
}));

const Flashcard = props => {
    const classes = useStyles();
    const [isFrontSide, setIsFrontSide] = useState(true);

    const renderImage = () => {
        if (!props.img) {
            return null;
        }

        return (
            <div>
                <img style={{ width: "100%", height: "100%" }} src={props.img} referrerPolicy="no-referrer" alt="" />
            </div>
        );
    };

    const renderContent = () => {
        if (isFrontSide) {
            return (
                <div
                    key="front"
                    className={"FlashcardContainer"}
                    onClick={onClickHandler}
                >
                    <div className={classes.flashCard + " card-face"}>
                        <div className={classes.cardContent}>
                            <div className={classes.cardTitle}>
                                <Typography color="inherit">TERM</Typography>
                            </div>
                            <div className={classes.cardParagraph}>
                                {props.term}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    key="back"
                    className={"FlashcardContainer"}
                    onClick={onClickHandler}
                >
                    <div className={classes.flashCard + " card-face"}>
                        <div className={classes.cardContent}>
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
            );
        }
    };

    const onClickHandler = () => {
        setIsFrontSide(prevState => {
            return !prevState;
        });
    };

    return (
        <div className="card-scene" id={props.id}>
            {renderContent()}
        </div>
    );
}

export default Flashcard;
