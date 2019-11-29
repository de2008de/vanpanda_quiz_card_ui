import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import WCBadge from "../Badge/WCBadge";
import SFULogoSVG from "../../assets/svg/sfu_logo.svg";
import UBCLogoSVG from "../../assets/svg/ubc_logo.svg";
import ConceptCard from "./ConceptCard";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
    card: {
        width: "90%",
        minHeight: "12rem",
        margin: "1rem auto",
        backgroundColor: "#fff",
        borderColor: theme.palette.primary.light,
        borderWidth: "0.1rem",
        borderStyle: "solid"
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
        backgroundColor: theme.palette.primary.light,
        display: "flex",
        flexWrap: "wrap",
        padding: "0.3rem 0.6rem"
    },
    author: {
        marginTop: "0.5rem"
    }
}));

const readingFontFamily = "'Noto Serif', serif";

const oSchoolList = {
    "sfu": SFULogoSVG,
    "ubc": UBCLogoSVG
};

const StudyCard = props => {
    const classes = useStyles();

    const loadConceptCards = () => {
        const aConceptCards = [];
        const maxConceptCardDisplayed = 2;
        const conceptCards = props.conceptCards;
        if (!conceptCards) {
            return <ConceptCard key={0} term={"Click to see more"} />;
        } else {
            for (let i = 0; i < conceptCards.length; i++) {
                const oConceptCard = <ConceptCard key={conceptCards[i].id} term={conceptCards[i].term} />;
                aConceptCards.push(oConceptCard);
                if (aConceptCards.length === maxConceptCardDisplayed) {
                    break;
                }
            }
        }
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
                            {props.description}
                        </Box>
                    </Typography>
                    <Box className={classes.infoBar}>
                        <WCBadge content={props.conceptCards ? props.conceptCards.length : ""} color="primary" />{" "}
                        <span style={{ margin: "0.3rem" }}>Key Concepts</span>
                        <div style={{ flexGrow: "1" }}></div>
                        {oSchoolList[props.school] ? <img className={classes.svg} src={oSchoolList[props.school]} alt="school_logo" /> : ""}
                    </Box>
                    <Box>
                        {
                            props.username ?
                                <Chip
                                    className={classes.author}
                                    icon={<FaceIcon />}
                                    label={"created by " + props.username}
                                    clickable
                                    color="primary"
                                    variant="outlined"
                                />
                                :
                                <Chip
                                    className={classes.author}
                                    icon={<FaceIcon />}
                                    color="primary"
                                    variant="outlined"
                                />
                        }
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
