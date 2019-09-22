import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StudyCard from "../Card/StudyCard";
import { Link } from "react-router-dom";
import ServerConfig from "../../configs/ServerConfig";
import axios from "axios";
import vanpandaLogo from "../../assets/svg/vanpanda_logo_filled2.svg";

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
        this.classes = {
            logoContainer: {
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                top: "-1rem",
                right: 0
            },
            logo: {
                width: "6rem"
            }
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
                        <Link
                            to={"/detail/" + oStudyCard.id}
                            className="cardLink"
                            key={oStudyCard.id}
                        >
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
                    <div style={{position: "relative", width: "100%"}}>
                        <Typography variant="h5">
                            <Box fontWeight="bold">Today's</Box>
                        </Typography>
                        <Typography variant="h5">
                            <Box>Learning</Box>
                        </Typography>
                        <Typography color="textSecondary">
                            <Box component="span">
                                {this.state.numCourses +
                                    " courses: " +
                                    this.state.numKeyConcepts +
                                    " key concepts"}
                            </Box>
                        </Typography>
                        <Box style={this.classes.logoContainer}>
                            <img src={vanpandaLogo} style={this.classes.logo} />
                        </Box>
                    </div>
                </div>
                <div className="content">{this.state.studyCards}</div>
            </div>
        );
    }
}

export default HomePage;
