import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StudyCard from "../Card/StudyCard";
import { Link } from "react-router-dom";

import "../../assets/css/Home/HomePage.css";

const HomePage = props => {
    const loadStudyCards = () => {
        const aStudyCards = [];
        const aConceptCards = [
            {
                id: 1,
                content: "What is Demand definition"
            },
            {
                id: 2,
                content: "What is Supply definition"
            },
            {
                id: 3,
                content: "What is surplus"
            },
            {
                id: 4,
                content: "What is equilibrium"
            }
        ];
        const oStudyCard = (
            <Link to={"/detail/" + 1} className="cardLink">
                <StudyCard
                    key={1}
                    title="ECON 103"
                    subtitle="Chapter 1: Demand and Supply"
                    numConcepts={4}
                    school="sfu"
                    conceptCards={aConceptCards}
                ></StudyCard>
            </Link>
        );
        for (let i = 0; i < 2; i++) {
            aStudyCards.push(oStudyCard);
        }
        return aStudyCards;
    };

    return (
        <div className="HomePage">
            <div className="headerContainer">
                <div>
                    <Typography variant="h5">
                        <Box fontWeight="bold">Today's</Box>
                    </Typography>
                    <Typography variant="h5">
                        <Box>Learning</Box>
                    </Typography>
                    <Typography color="textSecondary">
                        <Box component="span">2 courses: 25 key concepts</Box>
                    </Typography>
                </div>
            </div>
            <div className="content">{loadStudyCards()}</div>
        </div>
    );
};

export default HomePage;
