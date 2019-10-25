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
    doNotKnow: {
        textAlign: "right",
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
            }
        }
    }

    const resetQuestion = () => {
        setIsAnswerCorrect(false);
        setUserInputAsnwer("");
        setShowAnswer(false);
    };

    const onClickIDontKnow = () => {
        setShowAnswer(true);
    };

    const onClickNextQuestion = () => {
        setIndexOfQuestion(index => {
            return index + 1;
        });
        resetQuestion();
    }

    const showStudyQuestion = () => {
        if (!studyCard.conceptCards) {
            return false;
        }
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
        const totalNumQuestions = studyCard.conceptCards.length;
        const conceptCardId = conceptCard.id;
        const isBookmared = bookmarks[conceptCardId];
        const correctAnswer = conceptCard.term;
        return (
            <div>
                <DetailCard
                    id={conceptCardId}
                    bookmarked={isBookmared}
                    definition={conceptCard.definition}
                />
                <Typography className={classes.indexIndicator}>
                    {indexOfQuestion + " of " + totalNumQuestions}
                </Typography>
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
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={onClickNextQuestion}
                            >
                                Next
                            </Button>
                        </div>
                        :
                        ""
                }
                <div>
                    {
                        !isAnswerCorrect ?
                            <Typography
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
    }

    return (
        <div className={classes.studyPage + " StudyPage"}>
            {showStudyQuestion()}
        </div>
    );
}

export default StudyPage;
