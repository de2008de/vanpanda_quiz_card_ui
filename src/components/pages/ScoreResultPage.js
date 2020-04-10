import React, { useState, useEffect, useContext } from "react";
import qs from "query-string";
import DetailCard from "../Card/DetailCard";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppContext } from "../context/AppContext";
import { convertConceptCardsArrayToMap } from "../api/StudyCardsApiHelper";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import { colors } from "../../theme/colorPalette";
import BigButton from "../buttons/BigButton";
import cardSVG from "../../assets/svg/card.svg";
import quizSVG from "../../assets/svg/quiz.svg";
import "../../assets/css/pages/ScoreResultPage.css";

const sStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    waterWaveContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "1rem"
    },
    scoreText: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    score: {
        color: colors.Tangerine
    }
}));

const ScoreResultPage = props => {
    const classes = useStyles();
    const { appContext } = useContext(AppContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [bookmarks, setBookmarks] = useState({});
    const [studyCard, setStudyCard] = useState({});
    const studyCardId = qs.parse(props.location.search).id;

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

    const getTotalScore = () => {
        if (!appContext || !appContext.scoreResult) {
            return 0;
        }

        const correctIds = appContext.scoreResult.correctIds;
        const notCorrectIds = appContext.scoreResult.notCorrectIds;

        if (correctIds.length + notCorrectIds.length === 0) {
            return 0;
        }

        const totalConceptCards = correctIds.length + notCorrectIds.length;
        const numCorrectIds = correctIds.length;
        const score = Math.ceil(numCorrectIds / totalConceptCards * 100);
        return score;
    }

    const score = getTotalScore();

    const onTabChange = (event, index) => {
        setTabIndex(index);
    };

    const onClickBackToStudyCard = () => {
        props.history.push("/detail?id=" + studyCardId);
    };

    const onClickStudyAgain = () => {
        const type = qs.parse(props.location.search).type;
        props.history.push("/studyCard/study?id=" + studyCardId + "&type=" + type);
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

    const showDetailCards = () => {
        const CORRECT = "correct"
        const NOT_CORRECT = "not correct";
        const tabIndexMap = {
            0: CORRECT,
            1: NOT_CORRECT
        };
        const currentTab = tabIndexMap[tabIndex];
        let detailCardIds = [];
        if (currentTab === CORRECT) {
            if (appContext && appContext.scoreResult) {
                detailCardIds = appContext.scoreResult.correctIds;
            }
        } else if (currentTab === NOT_CORRECT) {
            if (appContext && appContext.scoreResult) {
                detailCardIds = appContext.scoreResult.notCorrectIds;
            }
        }
        if (!studyCard || !studyCard.conceptCards) {
            return false;
        }
        const conceptCards = studyCard.conceptCards;
        const conceptCardsMap = convertConceptCardsArrayToMap(conceptCards);
        const detailCards = [];
        detailCardIds.forEach(id => {
            const conceptCard = conceptCardsMap[id];
            const isBookmared = bookmarks[id];
            const detailCardComponent = (
                <DetailCard
                    id={id}
                    key={id}
                    term={conceptCard.term}
                    bookmarked={isBookmared}
                    definition={conceptCard.definition}
                    boomarkOnClickCallback={boomarkOnClickCallback(id)}
                >
                </DetailCard>
            );
            detailCards.push(detailCardComponent);
        });
        return (
            <div className="detailcard-container" key={tabIndex}>
                {detailCards}
            </div>
        );
    };

    return (
        <div className="StudyPageResult">
            <div className="score-card">
                <div className="score-card-text">
                    Your score is
                    <div className={classes.score + " score-card-score"}>
                        {score}%
                    </div>
                </div>
            </div>
            <div className="button-group">
                <BigButton
                    svg={cardSVG}
                    text="Back"
                    className="button"
                    onClickHandler={onClickBackToStudyCard}
                />
                <BigButton
                    svg={quizSVG}
                    text="Again"
                    className="button"
                    onClickHandler={onClickStudyAgain}
                />
            </div>
            <div>
                <div>
                    <Tabs
                        value={tabIndex}
                        onChange={onTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="CORRECT" />
                        <Tab label="NOT CORRECT" />
                    </Tabs>
                </div>
                <div>
                    {showDetailCards()}
                </div>
            </div>
        </div>
    );
};

export default ScoreResultPage;
