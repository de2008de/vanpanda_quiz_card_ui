import React from "react";
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
    }
}));

const ExplorePage = props => {
    const classes = useStyles();

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
        </div>
    );
};

export default ExplorePage;
