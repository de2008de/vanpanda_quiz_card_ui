import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import qs from "query-string";
import DetailCard from "../Card/DetailCard";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
    getBookmarks,
    convertBookmarkArrayToMap
} from "../api/BookmarkApiHelper";
import { getRandomNumber } from "../../helpers/mathHelper";
import { shuffleArray } from "../../helpers/arrayHelper";
import BigButton from "../buttons/BigButton";
import { borders, colors } from "../../theme/colorPalette";
import DoneIcon from '@material-ui/icons/Done';
import "../../assets/css/pages/StudyPage.css";

const sStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    answerFieldWrapper: {
        margin: "0.5rem",
        display: "flex"
    },
    textField: {
        display: "flex",
        width: "100%"
    },
    tickIconWrapper: {
        color: "#00E676",
        display: "flex",
        alignItems: "center"
    },
    answerCard: {
        background: colors.Cream,
        border: borders.default,
        margin: "0.5rem",
        padding: "1rem",
        borderRadius: "10px"
    },
    indexIndicator: {
        textAlign: "center"
    },
    multipleChoiceButton: {
        display: "block",
        width: "100%"
    }
}));

const StudyPage = props => {
    const classes = useStyles();
    const { appContext, setAppContext } = useContext(AppContext);
    const [studyCard, setStudyCard] = useState({});
    const [bookmarks, setBookmarks] = useState({});
    const [indexOfQuestion, setIndexOfQuestion] = useState(0);
    const [userInputAnswer, setUserInputAsnwer] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
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
            .catch(() => {});
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
            .catch(() => {});
    }, [appContext]);

    useEffect(() => {
        // init score result
        setAppContext(prevState => {
            const scoreResult = {
                correctIds: [],
                notCorrectIds: []
            }

            return {
                ...prevState,
                scoreResult
            }
        });
    }, [setAppContext]);

    const userInputAnswerOnChange = correctAnswer => {
        return event => {
            const pendingAnswer = event.target.value;
            setUserInputAsnwer(pendingAnswer);
            if (
                pendingAnswer.trim().toLowerCase() ===
                correctAnswer.trim().toLowerCase()
            ) {
                setIsAnswerCorrect(true);
                recordResult();
            }
        };
    };

    const resetQuestion = () => {
        setIsAnswerCorrect(false);
        setUserInputAsnwer("");
        setShowAnswer(false);
    };

    const onClickShowAnswer = () => {
        recordResult(false);
        setShowAnswer(true);
    };

    const recordResult = (isAnswerCorrect = true) => {
        const conceptCardId = studyCard.conceptCards[indexOfQuestion].id;
        const didUserShowAnswer = showAnswer;

        const correctIds = [];
        const notCorrectIds = [];

        if (didUserShowAnswer || !isAnswerCorrect) {
            notCorrectIds.push(conceptCardId);
        } else {
            correctIds.push(conceptCardId);
        }

        setAppContext(prevState => {
            const scoreResult = {
                correctIds: [...prevState.scoreResult.correctIds, ...correctIds],
                notCorrectIds: [...prevState.scoreResult.notCorrectIds, ...notCorrectIds]
            }

            return {
                ...prevState,
                scoreResult
            }
        });
    };

    const onClickNextQuestion = () => {
        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        const totalNumQuestions = studyCard.conceptCards.length;
        if (indexOfQuestion === totalNumQuestions - 1) {
            return false;
        }
        setIndexOfQuestion(index => {
            return index + 1;
        });
        resetQuestion();
    };

    const getResultParamsString = () => {
        let scoreResult = null;

        if (appContext && appContext.scoreResult) {
            scoreResult = appContext.scoreResult;
        }

        const params = encodeURIComponent(JSON.stringify(scoreResult));
        const paramString = "result=" + params + "&id=" + studyCardId;
        return paramString;
    };

    const onClickShowResult = () => {
        goToShowResultPage();
    };

    const goToShowResultPage = () => {
        const type = qs.parse(props.location.search).type;
        const params = getResultParamsString();
        props.history.push(
            "/studyCard/study/score?" + params + "&type=" + type
        );
    };

    const boomarkOnClickCallback = conceptCardId => {
        return () => {
            setBookmarks(bookmarks => {
                if (bookmarks[conceptCardId]) {
                    delete bookmarks[conceptCardId];
                } else {
                    bookmarks[conceptCardId] = {
                        conceptCardId: conceptCardId
                    };
                }
                return bookmarks;
            });
        };
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

    const onClickMultipleChoiceButton = (pendingAnswer, correctAnswer) => {
        return event => {
            let isCorrect = true;
            if (
                pendingAnswer.trim().toLowerCase() ===
                correctAnswer.trim().toLowerCase()
            ) {
                isCorrect = true;
            } else {
                isCorrect = false;
            }
            recordResult(isCorrect);
            const totalNumQuestions = studyCard.conceptCards.length;
            if (indexOfQuestion === totalNumQuestions - 1) {
                goToShowResultPage();
            } else {
                goToNextQuestion();
            }
        };
    };

    const showMultipleChoices = studyCard => {
        const multipleChoices = getMultipleChoices(studyCard);
        const choices = [];
        let key;
        for (key in multipleChoices.choices) {
            choices.push(multipleChoices.choices[key]);
        }
        const shuffledChoices = shuffleArray(choices);
        const choiceButtons = [];
        shuffledChoices.forEach((choice, index) => {
            const button = (
                <div
                    key={index}
                    className=" choice-wrapper"
                    onClick={onClickMultipleChoiceButton(
                        choice,
                        multipleChoices.correctAnswer
                    )}
                >
                    <div className="choice-text">
                        {choice}
                    </div>
                </div>
            );
            choiceButtons.push(button);
        });
        return choiceButtons;
    };

    const showDetailCard = () => {
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
        const totalNumQuestions = studyCard.conceptCards.length;
        const conceptCardId = conceptCard.id;
        const isBookmared = bookmarks[conceptCardId];
        return (
            <div>
                <DetailCard
                    id={conceptCardId}
                    key={conceptCardId}
                    bookmarked={isBookmared}
                    definition={conceptCard.definition}
                    boomarkOnClickCallback={boomarkOnClickCallback(
                        conceptCardId
                    )}
                />
                <Typography className={classes.indexIndicator}>
                    {indexOfQuestion + 1 + " of " + totalNumQuestions}
                </Typography>
            </div>
        );
    };

    const showMultipleChoiceQuestion = () => {
        if (!studyCard.conceptCards) {
            return <div></div>;
        }
        return (
            <div>
                {showDetailCard()}
                <div>
                    <Typography className="hint-text">
                        Multiple Choice
                    </Typography>
                    <div className="multiple-choices-area" key={indexOfQuestion}>
                        {showMultipleChoices(studyCard)}
                    </div>
                </div>
            </div>
        );
    };

    const getCorrectAnswer = () => {
        return studyCard.conceptCards[indexOfQuestion].term;
    };

    const renderWrittenQuestionButtons = () => {
        const buttons = [];

        const showAnswerBtn = (
            <BigButton
                svg={null}
                text={"Show Answer"}
                onClickHandler={onClickShowAnswer}
                disabled={showAnswer}
            />
        );

        const nextQuestionBtn = (
            <BigButton
                svg={null}
                text={"Next Question"}
                onClickHandler={onClickNextQuestion}
                disabled={!showAnswer && !isAnswerCorrect}
            />
        );

        const showScoreBtn = (
            <BigButton
                svg={null}
                text={"Show Score"}
                onClickHandler={onClickShowResult}
                disabled={!showAnswer && !isAnswerCorrect}
            />
        );

        buttons.push(showAnswerBtn);
        const totalNumQuestions = studyCard.conceptCards.length
        if (indexOfQuestion === totalNumQuestions - 1) {
            buttons.push(showScoreBtn);
        } else {
            buttons.push(nextQuestionBtn);
        }

        return (
            <div className="button-group">
                {buttons}
            </div>
        );
    };

    const showWrittenQuestionAnswer = () => {
        if (!showAnswer) {
            return null;
        }

        return (
            <div className={classes.answerCard}>
                {getCorrectAnswer()}
            </div>
        );
    };

    const showWrittenQuestion = () => {
        if (!studyCard.conceptCards) {
            return <div></div>;
        }
        return (
            <div className="written-questions">
                {showDetailCard()}
                {showWrittenQuestionAnswer()}
                <div className={classes.answerFieldWrapper}>
                    <TextField
                        value={userInputAnswer}
                        onChange={userInputAnswerOnChange(getCorrectAnswer())}
                        margin="normal"
                        className={classes.textField + " answer-text-field"}
                        inputProps={{
                            autoComplete: "off"
                        }}
                        disabled={(showAnswer && !isAnswerCorrect) || isAnswerCorrect}
                    />
                    <div className={classes.tickIconWrapper}>
                        {isAnswerCorrect ? <DoneIcon color="inherit" /> : null}
                    </div>
                </div>
                {renderWrittenQuestionButtons()}
            </div>
        );
    };

    const showQuestion = () => {
        const type = qs.parse(props.location.search).type;
        if (type === "written") {
            return showWrittenQuestion();
        } else if (type === "multiple_choice") {
            return showMultipleChoiceQuestion();
        } else {
            return showWrittenQuestion();
        }
    };

    return (
        <div className={classes.studyPage + " StudyPage"}>
            {showQuestion()}
        </div>
    );
};

export default StudyPage;
