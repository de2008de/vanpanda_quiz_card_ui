import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import WCCard from "../Card/WCCard";

import "../../assets/css/Home/HomePage.css";

const HomePage = () => {
    const loadStudyCards = () => {
        return (
            <WCCard
                title="ECON 103"
                content="Chapter 1: Demand and Supply"
            ></WCCard>
        );
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
