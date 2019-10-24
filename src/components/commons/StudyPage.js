import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import qs from "query-string";
import DetailCard from "../Card/DetailCard";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";

const sStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    textField: {
        display: "flex",
        width: "auto",
        margin: "0 1rem"
    },
    doNotKnow: {
        textAlign: "right",
        margin: "1rem",
        textDecoration: "underline",
        color: theme.palette.secondary.main
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
    };

    const showStudyQuestion = () => {
        if (!studyCard.conceptCards) {
            return false;
        }
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
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
                <TextField
                    label="Answer"
                    value={userInputAnswer}
                    onChange={userInputAnswerOnChange(correctAnswer)}
                    margin="normal"
                    className={classes.textField}
                    inputProps={{
                        autoComplete: "off"
                    }}
                    disabled={isAnswerCorrect}
                    helperText={
                        isAnswerCorrect ?
                            <Typography
                                component="span"
                                className={classes.helperText}
                                variant="subtitle1"
                                color="primary"
                            >
                                CORRECT!
                            </Typography>
                            :
                            ""
                    }
                />
                <div>
                    <Typography
                        className={classes.doNotKnow}
                    >
                        I don't know
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div>
            {showStudyQuestion()}
        </div>
    );
}

export default StudyPage;
