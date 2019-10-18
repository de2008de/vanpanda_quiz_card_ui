import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StudyCard from "../Card/StudyCard";
import { Link } from "react-router-dom";
import ServerConfig from "../../configs/ServerConfig";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import vanpandaLogo from "../../assets/svg/vanpanda_logo.svg";

import "../../assets/css/Home/HomePage.css";

const getStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    headerContainer: {
        display: "flex",
        flexWrap: "wrap",
        margin: "1rem 1rem 0.5rem 1rem"
    },
    logo: {
        width: "6rem",
    }
}));

const HomePage = props => {
    const classes = useStyles();
    const [studyCards, setStudyCards] = useState([]);
    const [numCourses, setNumCourses] = useState(0);
    const [numKeyConcepts, setNumKeyConcepts] = useState(0);

    const getStudyCards = iPageNumber => {
        const aStudyCardComponents = [];
        let numKeyConcepts = 0;
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
                    numKeyConcepts += oStudyCard.conceptCards.length;
                    aStudyCardComponents.push(oStudyCardComponent);
                });
                setStudyCards(aStudyCardComponents);
                setNumCourses(aStudyCards.length);
                setNumKeyConcepts(numKeyConcepts);
            });
    };

    useEffect(() => {
        getStudyCards(0);
    }, []);

    return (
        <div className="HomePage">
            <div className={classes.headerContainer}>
                <div>
                    <Typography variant="h5">
                        <Box fontWeight="bold">Today's</Box>
                    </Typography>
                    <Typography variant="h5">
                        <Box>Learning</Box>
                    </Typography>
                    <Typography color="textSecondary">
                        <Box component="span">
                            {numCourses +
                                " courses: " +
                                numKeyConcepts +
                                " key concepts"}
                        </Box>
                    </Typography>
                </div>
                <div style={{ flexGrow: 1 }}></div>
                <div>
                    <img src={vanpandaLogo} className={classes.logo} alt="vanpanda_logo" />
                </div>
            </div>
            <div className="content">{studyCards}</div>
        </div>
    );

}

export default HomePage;
