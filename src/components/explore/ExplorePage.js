import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WCCarousel from "../commons/WCCarousel";
import ServerConfig from "../../configs/ServerConfig";
import FeatureIcon from "./FeatureIcon";
import CarIcon from "../../assets/svg/car.svg";
import ChatIcon from "../../assets/svg/chat.svg";
import GraduateIcon from "../../assets/svg/graduate.svg";
import WritingIcon from "../../assets/svg/writing.svg";
import axios from "axios";
import StudyCard from "../Card/StudyCard";
import { Link } from "react-router-dom";

const getStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    searchBarWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        margin: "0.5rem 0.5rem 1rem 1rem"
    },
    mailIcon: {
        marginLeft: "0.5rem"
    },
    featureIconsContainer: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    recommendationTitle: {
        color: theme.palette.primary.contrastText,
        fontSize: "3vh",
        margin: "1rem",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "12px",
        padding: "0.5rem"
    }
}));

const ExplorePage = props => {
    const classes = useStyles();
    const [studyCards, setStudyCards] = useState([]);
    const getSearchBarPlaceholder = () => {
        return "BC驾照笔试";
    };

    const getCarouselImgArray = () => {
        const staticContentNames = [
            "banner1.jpg",
            "banner2.jpg",
            "banner3.jpg"
        ];
        const staticContentPaths = [];
        staticContentNames.forEach(name => {
            const path = ServerConfig.api.ip + "/assets/img/" + name;
            staticContentPaths.push(path);
        });
        return staticContentPaths;
    };

    const getStudyCards = iPageNumber => {
        const aStudyCardComponents = [];
        axios
            .get(ServerConfig.api.ip + getStudyCardApi + "?page=" + iPageNumber)
            .then(response => {
                const aStudyCards = response.data.data;
                aStudyCards.forEach(oStudyCard => {
                    const oStudyCardComponent = (
                        <Link
                            to={"/detail?id=" + oStudyCard.id}
                            className="cardLink"
                            key={oStudyCard.id}
                        >
                            <StudyCard
                                key={oStudyCard.id}
                                title={oStudyCard.title}
                                description={oStudyCard.description}
                                school={oStudyCard.school}
                                conceptCards={oStudyCard.conceptCards}
                                username={oStudyCard.username}
                            />
                        </Link>
                    );
                    aStudyCardComponents.push(oStudyCardComponent);
                });
                setStudyCards(aStudyCardComponents);
            });
    };

    useEffect(() => {
        getStudyCards(0);
    }, []);

    return (
        <div className="ExplorePage">
            <div className={classes.searchBarWrapper}>
                <SearchBar placeholder={getSearchBarPlaceholder()} />
                <MailOutlineIcon className={classes.mailIcon} />
            </div>
            <div>
                <WCCarousel imgSrcArray={getCarouselImgArray()} />
            </div>
            <div className={classes.featureIconsContainer}>
                <FeatureIcon src={GraduateIcon} text1="IELTS" text2="Test" />
                <FeatureIcon src={CarIcon} text1="Driver" text2="License" />
                <FeatureIcon src={ChatIcon} text1="Languages" />
                <FeatureIcon
                    src={WritingIcon}
                    text1="Immigration"
                    text2="Test"
                />
            </div>
            <div className={classes.recommendationContainer}>
                <div className={classes.recommendationTitle}>
                    Recommendations
                </div>
                <div>{studyCards}</div>
            </div>
        </div>
    );
};

export default ExplorePage;
