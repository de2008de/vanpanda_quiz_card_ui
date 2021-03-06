import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import qs from "query-string";
import Flashcard from "../Card/Flashcard";
import { makeStyles, Typography } from "@material-ui/core";
import BigButton from "../buttons/BigButton";
import "../../assets/css/pages/FlashCardPage.css";

const sStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    cardNumberIndicator: {
        textAlign: "center",
        margin: "0.5rem auto"
    }
}));

const FlashcardPage = props => {
    const classes = useStyles();
    const { appContext } = useContext(AppContext);
    const [studyCard, setStudyCard] = useState({});
    const [indexOfCard, setIndexOfCard] = useState(0);
    const studyCardId = qs.parse(props.location.search).id;

    useEffect(() => {
        // If we have cache, then use cache
        if (appContext && appContext.studyCard) {
            setStudyCard(appContext.studyCard);
            return;
        }
        const headers = {
            token: window.localStorage.getItem("token")
        };
        axios
            .get(ServerConfig.api.ip + sStudyCardApi + "/" + studyCardId, {
                headers: headers
            })
            .then(response => {
                const studyCard = response.data.data;
                setStudyCard(studyCard);
            })
            .catch(() => { });
    }, [appContext, studyCardId]);

    const onClickNext = () => {
        const maxNumberOfCards = studyCard.conceptCards.length;
        if (indexOfCard === maxNumberOfCards - 1) {
            setIndexOfCard(0);
        } else {
            setIndexOfCard(indexOfCard + 1);
        }
    }

    const onClickPrevious = () => {
        const maxNumberOfCards = studyCard.conceptCards.length;
        if (indexOfCard === 0) {
            setIndexOfCard(maxNumberOfCards - 1);
        } else {
            setIndexOfCard(indexOfCard - 1);
        }
    }

    return (
        <div className="FlashCardPage">
            <Flashcard
                id="flashcard"
                key={indexOfCard}
                term={studyCard.conceptCards ? studyCard.conceptCards[indexOfCard].term : ""}
                definition={studyCard.conceptCards ? studyCard.conceptCards[indexOfCard].definition : ""}
                img={studyCard.conceptCards ? studyCard.conceptCards[indexOfCard].img : null}
            />
            <div className={classes.cardNumberIndicator}>
                <Typography variant="subtitle1">{(indexOfCard + 1) + " of " + (studyCard.conceptCards && studyCard.conceptCards.length)}</Typography>
            </div>
            <div className="button-group">
                <BigButton
                    svg={null}
                    text="Previous"
                    className="button"
                    onClickHandler={onClickPrevious}
                />
                <BigButton
                    svg={null}
                    text="Next"
                    className="button"
                    onClickHandler={onClickNext}
                />
            </div>
        </div>
    );
}

export default FlashcardPage;
