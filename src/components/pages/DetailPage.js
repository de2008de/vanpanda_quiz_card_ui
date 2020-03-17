import React, { useState, useEffect, useContext } from "react";
import GoBackArrow from "../commons/GoBackArrow";
import { makeStyles, Typography, Box } from "@material-ui/core";
import WCBadge from "../Badge/WCBadge";
import SFULogoSVG from "../../assets/svg/sfu_logo.svg";
import UBCLogoSVG from "../../assets/svg/ubc_logo.svg";
import DetailCard from "../Card/DetailCard";
import ButtonCard from "../Card/ButtonCard";
import qs from "query-string";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import { isAuthenticated, getUserIdFromToken } from "../../utils/auth";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import bookSVG from "../../assets/svg/book.svg";
import cardSVG from "../../assets/svg/card.svg";
import quizSVG from "../../assets/svg/quiz.svg";
import { AppContext } from "../context/AppContext";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";
import { collectStudyCard, removeStudyCardFromCollection } from "../api/StudyCardsApiHelper";
import { getAxioCancelTokenSource } from "../../helpers/general";
import Switch from '@material-ui/core/Switch';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const sStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#fff"
    },
    headerTitleContainer: {
        margin: "0.5rem 1rem"
    },
    arrowBack: {
        margin: "0.5rem"
    },
    svg: {
        width: "3rem"
    },
    infoBar: {
        margin: "0.5rem 0",
        display: "flex",
        alignItems: "center"
    },
    author: {
        margin: "0.5rem auto"
    },
    buttonGroup: {
        display: "flex",
        flexWrap: "wrap",
        margin: "0.5rem"
    },
    warningText: {
        color: theme.palette.secondary.main,
        marginLeft: "1rem"
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));

const DetailPage = props => {
    const classes = useStyles();
    const studyCardId = qs.parse(props.location.search).id;
    const [studyCard, setStudyCard] = useState({});
    const [bookmarks, setBookmarks] = useState({});
    const [isCollected, setIsCollected] = useState(false);
    const [isSwitchReady, setIsSwitchReady] = useState(false);
    const [showCollectWarning, setShowCollectWarning] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningText, setWarningText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { setAppContext } = useContext(AppContext);
    let userId = null;
    const userToken = window.localStorage.getItem("token");
    if (userToken) {
        userId = getUserIdFromToken(userToken);
    }

    const getStudyCardById = (id, cancelToken) => {
        const requestHeader = {
            token: window.localStorage.getItem("token")
        }
        axios
            .get(ServerConfig.api.ip + sStudyCardApi + "/" + id, {
                headers: requestHeader,
                cancelToken: cancelToken
            })
            .then(response => {
                setIsLoading(false);
                const studyCard = response.data.data;
                const metadata = response.data.metadata;
                setStudyCard(studyCard);
                setIsSwitchReady(true);
                if (metadata.isCollected) {
                    setIsCollected(true);
                }
            })
            .catch(thrown => { });
    };

    const callGetBookmarksApi = cancelToken => {
        getBookmarks(cancelToken)
            .then(response => {
                const bookmarks = response.data.data.bookmarks;
                const bookmarkMap = convertBookmarkArrayToMap(bookmarks);
                setBookmarks(bookmarkMap);
            })
            .catch(thrown => { });
    };

    const renderLoader = () => {
        if (isLoading) {
            return (
                <div className={classes.loaderContainer}>
                    <CircularProgress />
                </div>
            );
        }
    };

    useEffect(() => {
        const cancelTokenSource = getAxioCancelTokenSource();
        const cancelToken = cancelTokenSource.token;
        getStudyCardById(studyCardId, cancelToken);
        if (isAuthenticated()) {
            callGetBookmarksApi(cancelToken);
        }
        return () => {
            cancelTokenSource.cancel();
        }
    }, [studyCardId]);

    const schoolLogos = {
        sfu: SFULogoSVG,
        ubc: UBCLogoSVG
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

    const loadConceptCards = () => {
        const aDetailCards = [];
        if (!studyCard.conceptCards) {
            return;
        }
        studyCard.conceptCards.forEach(oConceptCard => {
            const oDetailCard = (
                <DetailCard
                    id={oConceptCard.id}
                    key={oConceptCard.id}
                    bookmarked={bookmarks[oConceptCard.id] ? true : false}
                    term={oConceptCard.term}
                    definition={oConceptCard.definition}
                    boomarkOnClickCallback={boomarkOnClickCallback(oConceptCard.id)}
                />
            );
            aDetailCards.push(oDetailCard);
        });
        return aDetailCards;
    };

    const onClickAuthorHandler = () => {
        const authorProfileUrl = "/user/publicProfile?id=" + studyCard.userId;
        props.history.push(authorProfileUrl);
    };

    const onClickTestHandler = () => {
        setAppContext(prevState => {
            return {
                ...prevState,
                studyCard,
                bookmarks
            };
        });
        props.history.push("/studyCard/study?id=" + studyCardId + "&type=written");
    };

    const onClickFlashcardHandler = () => {
        setAppContext(prevState => {
            return {
                ...prevState,
                studyCard,
                bookmarks
            };
        });
        props.history.push("/studyCard/flashcard?id=" + studyCardId);
    }

    const onClickQuizHandler = () => {
        if (studyCard.conceptCards.length < 2) {
            setShowWarning("true");
            setWarningText("Need at least 2 terms/definitions for Quiz");
            return;
        }
        setAppContext(prevState => {
            return {
                ...prevState,
                studyCard,
                bookmarks
            }
        });
        props.history.push("/studyCard/study?id=" + studyCardId + "&type=multiple_choice");
    };

    const onSwitchCollectHandler = () => {
        const isOwnerTryingToRemoveCard = userId === studyCard.userId && isCollected;
        if (!window.localStorage.getItem("token") || isOwnerTryingToRemoveCard) {
            setShowCollectWarning(true);
            return;
        }
        if (isCollected) {
            removeStudyCardFromCollection(studyCardId);
        } else {
            collectStudyCard(studyCardId);
        }
        setIsCollected(prevState => {
            return !prevState;
        });
    };

    const renderCollectWarning = () => {
        if (!showCollectWarning) {
            return null;
        }
        if (userId === studyCard.userId) {
            return (
                <div className={classes.warningText}>
                    Card owner is not allowed to un-collect their own cards.
                </div>
            );
        } else {
            return (
                <div className={classes.warningText}>
                    Please <Link to={"/login"}> Login </Link> to collect cards
                </div>
            );
        }
    };

    const renderGeneralWarning = () => {
        if (showWarning) {
            return (
                <div className={classes.warningText}>
                    {warningText}
                </div>
            );
        }
    };

    const renderCollectSwitch = () => {
        const switchText = isCollected ? "Collected" : "Collect";
        return (
            <div>
                <Switch
                    checked={isCollected}
                    onChange={onSwitchCollectHandler}
                    color="primary"
                    disabled={!isSwitchReady}
                />
                <span>
                    {switchText}
                </span>
                {renderCollectWarning()}
            </div>
        );
    };

    return (
        <div className="DetailPage">
            <div className={classes.header}>
                <GoBackArrow
                    history={props.history}
                />
                <div className={classes.headerTitleContainer}>
                    {/* This should be retrieved from data source */}
                    <Typography variant="h5">{studyCard.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {studyCard.description}
                    </Typography>
                    <Box className={classes.infoBar}>
                        <WCBadge
                            content={
                                studyCard.conceptCards
                                    ? studyCard.conceptCards.length
                                    : 0
                            }
                            color="primary"
                        />
                        <span style={{ margin: "0.3rem" }}>Key Concepts</span>
                        <div style={{ flexGrow: "1" }}></div>
                        {schoolLogos[studyCard.school] ? <img className={classes.svg} src={schoolLogos[studyCard.school]} alt="school_logo" /> : ""}
                    </Box>
                    <Box>
                        <Chip
                            className={classes.author}
                            icon={<FaceIcon />}
                            label={"created by " + studyCard.username}
                            clickable
                            color="primary"
                            variant="outlined"
                            onClick={onClickAuthorHandler}
                        />
                    </Box>
                </div>
            </div>
            <div className={classes.buttonGroup}>
                <ButtonCard
                    svg={quizSVG}
                    text="QUIZ"
                    onClickHandler={onClickQuizHandler}
                />
                <ButtonCard
                    svg={bookSVG}
                    text="TEST"
                    onClickHandler={onClickTestHandler}
                />
                <ButtonCard
                    svg={cardSVG}
                    text="CARDS"
                    onClickHandler={onClickFlashcardHandler}
                />
            </div>
            <div>
                {renderGeneralWarning()}
            </div>
            <div>
                {renderCollectSwitch()}
            </div>
            {renderLoader()}
            <div className="content">
                {loadConceptCards()}
            </div>
        </div>
    );
};

export default DetailPage;
