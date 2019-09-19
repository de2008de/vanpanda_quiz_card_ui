import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import WCBadge from "../Badge/WCBadge";
import SFUlogoSVG from "../../assets/svg/sfu_logo.svg";
import ConceptCard from "./ConceptCard";

const useStyles = makeStyles({
    card: {
        width: "90%",
        minHeight: "12rem",
        margin: "1rem auto"
    },
    svg: {
        width: "3rem"
    },
    infoBar: {
        margin: "0.5rem 0",
        display: "flex",
        alignItems: "center"
    },
    conceptCardContainer: {
        backgroundColor: "#F7F6F4",
        padding: "0.3rem 0.6rem"
    }
});

const readingFontFamily = "'Noto Serif', serif";

const oSchoolList = {
    "sfu": SFUlogoSVG,
    "ubc": null
};

const StudyCard = props => {
    const classes = useStyles();

    const loadConceptCards = () => {
        const aConceptCards = [];
        props.conceptCards.forEach(conceptCard => {
            const oConceptCard = <ConceptCard key={conceptCard.id} content={conceptCard.title} />;
            aConceptCards.push(oConceptCard);
        });
        return <div>{aConceptCards}</div>;
    };

    return (
        <Card className={classes.card + " StudyCard"}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Box fontFamily={readingFontFamily}>{props.title}</Box>
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <Box fontFamily={readingFontFamily} component="span">
                            {props.subtitle}
                        </Box>
                    </Typography>
                    <Box className={classes.infoBar}>
                        <WCBadge content={props.conceptCards.length} color="primary" />{" "}
                        <span style={{ margin: "0.3rem" }}>Key Concepts</span>
                        <div style={{ flexGrow: "1" }}></div>
                        <img className={classes.svg} src={oSchoolList[props.school]} />
                    </Box>
                </CardContent>
                <div className={classes.conceptCardContainer}>
                    {loadConceptCards()}
                </div>
            </CardActionArea>
        </Card>
    );
};

export default StudyCard;
