import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles, Typography, Box } from "@material-ui/core";
import WCBadge from "../Badge/WCBadge";
import SFULogoSVG from "../../assets/svg/sfu_logo.svg";
import UBCLogoSVG from "../../assets/svg/ubc_logo.svg";
import DetailCard from "../Card/DetailCard";
import qs from "query-string";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import { isAuthenticated } from "../../utils/auth";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const sStudyCardApi = "/api/v1/card/studycard";
const bookmarkApi = "/api/v1/bookmark";

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
    }
}));

const DetailPage = props => {
    const classes = useStyles();
    const studyCardId = qs.parse(props.location.search).id;
    const [studyCard, setStudyCard] = useState({});
    const [bookmarks, setBookmarks] = useState({});

    const getStudyCardById = id => {
        axios
            .get(ServerConfig.api.ip + sStudyCardApi + "/" + id)
            .then(response => {
                const studyCard = response.data.data;
                setStudyCard(studyCard);
            })
            .catch(() => { });
    };

    const getBookmarks = () => {
        const headers = {
            token: window.localStorage.getItem("token")
        };
        axios
            .get(ServerConfig.api.ip + bookmarkApi, {
                headers: headers
            })
            .then(response => {
                const bookmarks = response.data.data.bookmarks;
                const bookmarkMap = {};
                bookmarks.forEach(oBookmark => {
                    bookmarkMap[oBookmark.conceptCardId] = oBookmark;
                });
                setBookmarks(bookmarkMap);
            });
    };

    useEffect(() => {
        getStudyCardById(studyCardId);
        if (isAuthenticated()) {
            getBookmarks();
        }
    }, [studyCardId]);

    const backArrowOnClickHandler = () => {
        props.history.goBack();
    };

    const schoolLogos = {
        sfu: SFULogoSVG,
        ubc: UBCLogoSVG
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

    return (
        <div className="DetailPage">
            <div className={classes.header}>
                <div onClick={backArrowOnClickHandler}>
                    <ArrowBackIcon
                        className={classes.arrowBack}
                        color="primary"
                    />
                </div>
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
            <div className="content">{loadConceptCards()}</div>
        </div>
    );
};

export default DetailPage;
