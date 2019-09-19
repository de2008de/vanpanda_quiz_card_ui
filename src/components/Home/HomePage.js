import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StudyCard from "../Card/StudyCard";
import { Link } from "react-router-dom";
import ServerConfig from "../../configs/ServerConfig";
import axios from "axios";

import "../../assets/css/Home/HomePage.css";

const getStudyCardApi = "/api/v1/card/studycard";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studyCards: [],
            numCourses: 0,
            numKeyConcepts: 0
        };
    }
    getStudyCards = iPageNumber => {
        const aStudyCardComponents = [];
        let numKeyConcepts = 0;
        axios
            .get(ServerConfig.api.ip + getStudyCardApi + "?page=" + iPageNumber)
            .then(response => {
                const aStudyCards = response.data.data;
                aStudyCards.forEach(oStudyCard => {
                    const oStudyCardComponent = (
                        <Link to={"/detail/" + oStudyCard.id} className="cardLink" key={oStudyCard.id}>
                            <StudyCard
                                key={oStudyCard.id}
                                title={oStudyCard.title}
                                subtitle={oStudyCard.subtitle}
                                school={oStudyCard.school}
                                conceptCards={oStudyCard.conceptCards}
                            />
                        </Link>
                    );
                    numKeyConcepts += oStudyCard.conceptCards.length;
                    aStudyCardComponents.push(oStudyCardComponent);
                });
                this.setState({
                    studyCards: aStudyCardComponents,
                    numCourses: aStudyCards.length,
                    numKeyConcepts: numKeyConcepts
                });
            });
    };

    componentDidMount() {
        this.getStudyCards(0);
    }

    render() {
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
                            <Box component="span">
                                {this.state.numCourses + " courses: " + this.state.numKeyConcepts + " key concepts"}
                            </Box>
                        </Typography>
                    </div>
                </div>
                <div className="content">{this.state.studyCards}</div>
            </div>
        );
    }
}

export default HomePage;
