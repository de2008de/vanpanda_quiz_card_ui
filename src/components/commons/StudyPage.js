import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import qs from "query-string";
import DetailCard from "../Card/DetailCard";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";
import { getRandomNumber } from "../../helpers/mathHelper";
import { shuffleArray } from "../../helpers/arrayHelper";
import GoBackArrow from "./GoBackArrow";
import "../../assets/css/commons/StudyPage.css";

const sStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    studyPage: {
        margin: "0 1rem"
    },
    textField: {
        display: "flex",
        width: "auto",
    },
    doNotKnowContainer: {
        textAlign: "right"
    },
    doNotKnow: {
        textDecoration: "underline",
        color: theme.palette.secondary.main,
        margin: "0.5rem 0"
    },
    helperTextContainer: {
        display: "flex",
        alignItems: "center",
        margin: "0.5rem 0"
    },
    indexIndicator: {
        textAlign: "center"
    },
    multipleChoiceButtonWrapper: {
        margin: "1rem 0.5rem"
    },
    multipleChoiceButton: {
        display: "block",
        width: "100%"
    },
    hintText: {
        margin: "0.5rem 0.5rem"
    }
}));

const StudyPage = props => {
    const classes = useStyles();
    const { appContext } = useContext(AppContext);
    const [studyCard, setStudyCard] = useState({});
    const [bookmarks, setBookmarks] = useState({});
    const [indexOfQuestion, setIndexOfQuestion] = useState(0);
    const [userInputAnswer, setUserInputAsnwer] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [resultMap, setResultMap] = useState({
        masteredConceptCard: [],
        needImprovementConceptCard: []
    });
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

    const userInputAnswerOnChange = correctAnswer => {
        return event => {
            const pendingAnswer = event.target.value;
            setUserInputAsnwer(pendingAnswer);
            if (pendingAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
                setIsAnswerCorrect(true);
                recordResult();
                const totalNumQuestions = studyCard.conceptCards.length;
                if (indexOfQuestion === totalNumQuestions - 1) {
                    setShowResult(true);
                }
            }
        }
    };

    const resetQuestion = () => {
        setIsAnswerCorrect(false);
        setUserInputAsnwer("");
        setShowAnswer(false);
    };

    const onClickIDontKnow = () => {
        setShowAnswer(true);
    };

    const recordResult = (isAnswerCorrect = true) => {
        const conceptCardId = studyCard.conceptCards[indexOfQuestion].id;
        const didUserShowAnswer = showAnswer;
        setResultMap(result => {
            if (didUserShowAnswer || !isAnswerCorrect) {
                result.needImprovementConceptCard.push(conceptCardId);
            } else {
                result.masteredConceptCard.push(conceptCardId);
            }
            return result;
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
        const params = encodeURIComponent(JSON.stringify(resultMap));
        const paramString = "result=" + params + "&id=" + studyCardId;
        return paramString;
    };

    const onClickShowResult = () => {
        goToShowResultPage();
    };

    const goToShowResultPage = () => {
        const type = qs.parse(props.location.search).type;
        const params = getResultParamsString();
        props.history.push("/studyCard/study/result?" + params + "&type=" + type);
    };

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

    const onClickMultipleChoiceButton = (pendingAnswer, correctAnswer) => {
        return event => {
            let isCorrect = true;
            if (pendingAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
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
        shuffledChoices.forEach(choice => {
            const button = (
                <div
                    key={choice}
                    className={classes.multipleChoiceButtonWrapper}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.multipleChoiceButton}
                        onClick={onClickMultipleChoiceButton(choice, multipleChoices.correctAnswer)}
                    >
                        {choice}
                    </Button>
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
                    boomarkOnClickCallback={boomarkOnClickCallback(conceptCardId)}
                />
                <Typography className={classes.indexIndicator}>
                    {(indexOfQuestion + 1) + " of " + totalNumQuestions}
                </Typography>
            </div>
        );
    };

    const showMultipleChoiceQuestion = () => {
        if (!studyCard.conceptCards) {
            return false;
        }
        return (
            <div>
                {showDetailCard()}
                <div>
                    <Typography
                        className={classes.hintText}
                    >
                        Please select an answer.
                    </Typography>
                    {showMultipleChoices(studyCard)}
                </div>
            </div>
        );
    };

    const showWrittenQuestion = () => {
        if (!studyCard.conceptCards) {
            return false;
        }
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
        const correctAnswer = conceptCard.term;
        return (
            <div>
                {showDetailCard()}
                {
                    showAnswer ?
                        <div
                            className={classes.answer}
                        >
                            <Typography
                                color="primary"
                            >
                                Answer is: {correctAnswer}.
                            </Typography>
                        </div>
                        :
                        ""
                }
                <TextField
                    label={showAnswer ? '"' + correctAnswer + '" type it here' : "Type your answer"}
                    error={showAnswer && !isAnswerCorrect}
                    value={userInputAnswer}
                    onChange={userInputAnswerOnChange(correctAnswer)}
                    margin="normal"
                    className={classes.textField + " answer-text-field"}
                    inputProps={{
                        autoComplete: "off"
                    }}
                    disabled={isAnswerCorrect}
                />
                {
                    isAnswerCorrect ?
                        <div className={classes.helperTextContainer}>
                            <Typography
                                component="span"
                                className={classes.helperText}
                                variant="subtitle1"
                                color="primary"
                            >
                                CORRECT!
                            </Typography>
                            <div style={{ flexGrow: 1 }}></div>
                            {
                                !showResult ?
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={onClickNextQuestion}
                                    >
                                        Next
                                </Button>
                                    :
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={onClickShowResult}
                                    >
                                        Show Result
                                </Button>
                            }

                        </div>
                        :
                        ""
                }
                <div className={classes.doNotKnowContainer}>
                    {
                        !isAnswerCorrect ?
                            <Typography
                                component="span"
                                className={classes.doNotKnow}
                                onClick={onClickIDontKnow}
                            >
                                I don't know
                            </Typography>
                            :
                            ""
                    }
                </div>
            </div>
        );
    };

    const showQuestion = () => {
        const type = qs.parse(props.location.search).type;
        if (type === "written") {
            return showWrittenQuestion();
        } else if (type === "multiple_choice") {
            return showMultipleChoiceQuestion();
        }
    };

    return (
        <div className={classes.studyPage + " StudyPage"}>
            <GoBackArrow
                history={props.history}
            />
            {
                showQuestion()
            }
        </div>
    );
}

export default StudyPage;
