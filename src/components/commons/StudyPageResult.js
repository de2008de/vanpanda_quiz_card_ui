import React, { useState, useEffect, useContext } from "react";
import qs from "query-string";
import DetailCard from "../Card/DetailCard";
import Typography from '@material-ui/core/Typography';
import WaterWaveCircle from "../indicator/WaterWaveCircle";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppContext } from "../context/AppContext";
import { convertConceptCardsArrayToMap } from "../api/StudyCardsApiHelper";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";
import Button from '@material-ui/core/Button';
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";

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
    buttonGroup: {
        display: "flex",
        flexWrap: "wrap",
        margin: "0.5rem 1rem"
    }
}));

const StudyPageResult = props => {
    const classes = useStyles();
    const { appContext } = useContext(AppContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [bookmarks, setBookmarks] = useState({});
    const [studyCard, setStudyCard] = useState({});
    const result = JSON.parse(qs.parse(props.location.search).result);
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

    const getTotalScore = result => {
        const totalConceptCards = result.masteredConceptCard.length + result.needImprovementConceptCard.length;
        const numMasteredConceptCard = result.masteredConceptCard.length;
        const score = Math.ceil(numMasteredConceptCard / totalConceptCards * 100);
        return score;
    }

    const score = getTotalScore(result);

    const onTabChange = (event, index) => {
        setTabIndex(index);
    };

    const onClickBackToStudyCard = () => {
        props.history.push("/detail?id=" + studyCardId);
    };

    const onClickStudyAgain = () => {
        props.history.push("/studyCard/study?id=" + studyCardId);
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
        const MASTERED = "mastered"
        const NEED_IMPROVEMENT = "need_improvement";
        const tabIndexMap = {
            0: MASTERED,
            1: NEED_IMPROVEMENT
        };
        const currentTab = tabIndexMap[tabIndex];
        let detailCardIds = [];
        if (currentTab === MASTERED) {
            detailCardIds = result.masteredConceptCard;
        } else if (currentTab === NEED_IMPROVEMENT) {
            detailCardIds = result.needImprovementConceptCard;
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
        return detailCards;
    };

    return (
        <div className="StudyPageResult">
            <div className={classes.waterWaveContainer}>
                <WaterWaveCircle
                    percent={score}
                />
            </div>
            <div className={classes.scoreText}>
                <Typography variant="h6">
                    Your score is {score}%
                </Typography>
            </div>
            <div className={classes.buttonGroup}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClickBackToStudyCard}
                >
                    Back to Study Card
                </Button>
                <div style={{flexGrow: 1}}></div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickStudyAgain}
                >
                    Study Again
                </Button>
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
                        <Tab label="Mastered" />
                        <Tab label="Need Improvement" />
                    </Tabs>
                </div>
                <div>
                    {showDetailCards()}
                </div>
            </div>
        </div>
    );
};

export default StudyPageResult;
