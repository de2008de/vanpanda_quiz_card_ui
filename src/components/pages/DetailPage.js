import React, { useState, useEffect, useContext } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import BookIcon from "../../assets/svg/books_gradient.svg";
import DetailCard from "../Card/DetailCard";
import BigButton from "../buttons/BigButton";
import qs from "query-string";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import { isAuthenticated, getUserIdFromToken } from "../../utils/auth";
import bookSVG from "../../assets/svg/book.svg";
import bookmarkOutlined from "../../assets/svg/bookmark_outlined.svg";
import bookmarkFilled from "../../assets/svg/bookmark_filled.svg";
import cardSVG from "../../assets/svg/card.svg";
import quizSVG from "../../assets/svg/quiz.svg";
import { AppContext } from "../context/AppContext";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";
import { collectStudyCard, removeStudyCardFromCollection } from "../api/StudyCardsApiHelper";
import { getAxioCancelTokenSource } from "../../helpers/general";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { colors } from "../../theme/colorPalette";
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const sStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#fff",
        padding: "1rem 0 0.5rem 0",
        marginBottom: "0.5rem"
    },
    headerContent: {
        margin: "0.5rem 1rem",
        position: "relative"
    },
    title: {
        color: "#000",
        opacity: "87%",
        fontSize: "1.5rem"
    },
    descriptionContainer: {
        marginBottom: "1rem"
    },
    description: {
        color: "#000",
        opacity: "60%"
    },
    bookIconConatiner: {
        position: "absolute",
        marginRight: "1rem",
        right: "0",
        bottom: "0"
    },
    arrowBack: {
        margin: "0.5rem"
    },
    svg: {
        width: "3rem"
    },
    infoContainer: {
        margin: "0.5rem 0",
        color: "#000",
        opacity: "60%"
    },
    iconTextContainer: {
        display: "flex",
        alignItems: "center",
        margin: "0.5rem 0"
    },
    buttonGroup: {
        display: "flex",
        flexWrap: "wrap"
    },
    button: {
        flexGrow: 1
    },
    warningText: {
        color: theme.palette.secondary.main,
        marginLeft: "1rem"
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center"
    },
    iconContainer: {
        marginRight: "0.5rem"
    }
}));

const DetailPage = props => {
    const classes = useStyles();
    const studyCardId = qs.parse(props.location.search).id;
    const [studyCard, setStudyCard] = useState({});
    const [bookmarks, setBookmarks] = useState({});
    const [isCollected, setIsCollected] = useState(false);
    const [isStudyCardLoaded, setIsStudyCardLoaded] = useState(false);
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [expandDescription, setExpandDescription] = useState(false);
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
                setIsStudyCardLoaded(true);
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
                    img={oConceptCard.img}
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
            showSnackBar("Quiz requires at least two concept cards.");
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

    const showSnackBar = (text) => {

        setIsSnackBarOpen(true);
        setSnackBarMessage(text);

    };

    const onSwitchCollectHandler = () => {
        const isOwnerTryingToRemoveCard = userId === studyCard.userId && isCollected;
        if (isOwnerTryingToRemoveCard) {
            showSnackBar("You are the owner. Owners can't unsave their cards.");
            return;
        } else if (!window.localStorage.getItem("token")) {
            showSnackBar("Please sign in.");
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

    const renderCollectButton = () => {

        let svg = null;
        let text = null;
        let clickHandler = null;

        if (!isStudyCardLoaded) {
            svg = bookmarkOutlined;
            text = "Loading";
            clickHandler = null;
        } else if (isCollected) {
            svg = bookmarkFilled;
            text = "Saved";
            clickHandler = onSwitchCollectHandler;
        } else {
            svg = bookmarkOutlined;
            text = "Save";
            clickHandler = onSwitchCollectHandler;
        }

        return (
            <BigButton
                svg={svg}
                text={text}
                className={classes.button}
                onClickHandler={clickHandler}
            />
        );
    };

    const renderExpandDescriptionButton = () => {

        return (
            <span style={{ padding: "0.5rem", color: colors.Tangerine }} onClick={() => { setExpandDescription(true) }}>
                more
            </span>
        );

    };

    const getDescriptionOrEllipsis = () => {

        const description = studyCard.description || "No description";

        if (!expandDescription && description.length > 30) {

            return (
                <span>
                    <span className={classes.description}>
                        {description.substring(0, 30) + " ..."}
                    </span>
                    {renderExpandDescriptionButton()}
                </span>
            );

        } else {

            return (
                <span className={classes.description}>
                    {description}
                </span>
            );

        }

    };

    const renderNumConceptCards = () => {

        const numConceptCards = studyCard.conceptCards ? studyCard.conceptCards.length : 0;

        return (
            <div className={classes.iconTextContainer}>
                <div className={classes.iconContainer}> <MenuBookIcon /> </div> {numConceptCards} Concept Cards
            </div>
        );
    };

    const handlerSnackBarClose = () => {
        setIsSnackBarOpen(false);
    };

    return (
        <div className="DetailPage">
            <div className={classes.header}>
                <div className={classes.headerContent}>

                    <Typography className={classes.title}>
                        {studyCard.title}
                    </Typography>

                    <Typography className={classes.descriptionContainer}>
                        {getDescriptionOrEllipsis()}
                    </Typography>


                    <div className={classes.infoContainer}>

                        {renderNumConceptCards()}

                        <div className={classes.iconTextContainer} onClick={onClickAuthorHandler}>
                            <div className={classes.iconContainer}> <PersonIcon /> </div> {studyCard.username}
                        </div>

                    </div>

                    <div className={classes.bookIconConatiner}>
                        <img style={{ width: "4rem", height: "4rem" }} src={BookIcon} alt="" />
                    </div>

                </div>
            </div>
            <div className={classes.buttonGroup}>
                <BigButton
                    svg={quizSVG}
                    text="Quiz"
                    className={classes.button}
                    onClickHandler={onClickQuizHandler}
                />
                <BigButton
                    svg={bookSVG}
                    text="Test"
                    className={classes.button}
                    onClickHandler={onClickTestHandler}
                />
            </div>
            <div className={classes.buttonGroup}>
                <BigButton
                    svg={cardSVG}
                    text="Cards"
                    className={classes.button}
                    onClickHandler={onClickFlashcardHandler}
                />
                {renderCollectButton()}
            </div>
            {renderLoader()}
            <div className="content">
                {loadConceptCards()}
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                key={"snackbar"}
                open={isSnackBarOpen}
                onClose={handlerSnackBarClose}
                message={snackBarMessage}
            />
        </div>
    );
};

export default DetailPage;
