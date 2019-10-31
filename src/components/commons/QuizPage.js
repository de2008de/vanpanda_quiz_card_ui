import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import qs from "query-string";
import ServerConfig from "../../configs/ServerConfig";
import DetailCard from "../Card/DetailCard";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";
import Button from '@material-ui/core/Button';
import { getRandomNumber } from "../../helpers/mathHelper";
import { shuffleArray } from "../../helpers/arrayHelper";

const sStudyCardApi = "/api/v1/card/studycard";

const QuizPage = props => {
    const appContext = useContext(AppContext);
    const [studyCard, setStudyCard] = useState({});
    const [bookmarks, setBookmarks] = useState({});
    const [indexOfQuestion, setIndexOfQuestion] = useState(0);
    const studyCardId = qs.parse(props.location.search).id;

    useEffect(() => {
        // If we have cache, then use cache
        if (appContext && appContext.studyCard) {
            setStudyCard(appContext.studyCard);
            return;
        }
        axios
            .get(ServerConfig.api.ip + sStudyCardApi + "/" + studyCardId)
            .then(response => {
                const studyCard = response.data.data;
                setStudyCard(studyCard);
            })
            .catch(() => { });
    }, [appContext, studyCardId]);

    useEffect(() => {
        // If we have cache, then use cache
        if (appContext && appContext.bookmarks) {
            setBookmarks(appContext.bookmarks);
            return;
        }
        getBookmarks()
            .then(response => {
                const bookmarks = response.data.data.bookmarks;
                const bookmarkMap = convertBookmarkArrayToMap(bookmarks);
                setBookmarks(bookmarkMap);
            })
            .catch(() => { });
    }, [appContext]);

    const boomarkOnClickCallback = conceptCardId => {
        return () => {
            setBookmarks(bookmarks => {
                if (bookmarks[conceptCardId]) {
                    delete bookmarks[conceptCardId];
                } else {
                    bookmarks[conceptCardId] = {
                        conceptCardId: conceptCardId
                    }
                }
                return bookmarks;
            });
        }
    };

    const getMultipleChoices = studyCard => {
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
        const conceptCardId = conceptCard.id;
        const correctAnswer = conceptCard.term;
        const numConceptCard = studyCard.conceptCards.length;
        if (numConceptCard < 2) {
            return false;
        }
        const numChoices = numConceptCard > 4 ? 4 : numConceptCard;
        const multipleChoices = {
            choices: {},
            correctAnswer: null
        };
        const low = 0;
        const high = numConceptCard - 1;
        multipleChoices.choices[conceptCardId] = correctAnswer;
        multipleChoices.correctAnswer = correctAnswer;
        while (Object.keys(multipleChoices.choices).length < numChoices) {
            const randomAnswerIndex = getRandomNumber(low, high);
            const randomAnswer = studyCard.conceptCards[randomAnswerIndex];
            if (multipleChoices.choices[randomAnswer.id]) {
                continue;
            }
            multipleChoices.choices[randomAnswer.id] = randomAnswer.term;
        }
        return multipleChoices;
    };

    const showMultipleChoices = studyCard => {
        const multipleChoices = getMultipleChoices(studyCard);
        const choices = [];
        for (let key in multipleChoices.choices) {
            choices.push(multipleChoices.choices[key]);
        }
        const shuffledChoices = shuffleArray(choices);
        const choiceButtons = [];
        shuffledChoices.forEach(choice => {
            const button = (
                <Button
                    variant="outlined"
                    color="primary"
                >
                    {choice}
                </Button>
            );
            choiceButtons.push(button);
        });
        return choiceButtons;
    };

    const showQuizQuestion = () => {
        if (!studyCard.conceptCards) {
            return false;
        }
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
        const conceptCardId = conceptCard.id;
        const definition = conceptCard.definition;
        const isBookmared = bookmarks[conceptCardId];
        return (
            <div>
                <div>
                    <DetailCard
                        id={conceptCardId}
                        key={conceptCardId}
                        definition={definition}
                        bookmarked={isBookmared}
                        boomarkOnClickCallback={boomarkOnClickCallback(conceptCardId)}
                    >
                    </DetailCard>
                </div>
                <div>
                    {showMultipleChoices(studyCard)}
                </div>
            </div>
        );
    };

    return (
        <div className="QuizPage">
            <div>
                {showQuizQuestion()}
            </div>
        </div>
    );
};

export default QuizPage;
