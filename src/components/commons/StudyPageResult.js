import React from "react";
import qs from "query-string";
import DetailCard from "../Card/DetailCard";
import Typography from '@material-ui/core/Typography';
import WaterWaveCircle from "../indicator/WaterWaveCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    waterWaveContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "1rem"
    },
    scoreText: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }
}));

const StudyPageResult = props => {
    const classes = useStyles();
    const result = JSON.parse(qs.parse(props.location.search).result);

    const getTotalScore = result => {
        const totalConceptCards = result.masteredConceptCard.length + result.needImprovementConceptCard.length;
        const numMasteredConceptCard = result.masteredConceptCard.length;
        const score = Math.ceil(numMasteredConceptCard / totalConceptCards * 100);
        return score;
    }

    const score = getTotalScore(result);

    return (
        <div className="StudyPageResult">
            <div className={classes.waterWaveContainer}>
                <WaterWaveCircle
                    percent={score}
                />
            </div>
            <div className={classes.scoreText}>
                <Typography variant="h6">
                    Your score is {score}%
                </Typography>
            </div>
        </div>
    );
};

export default StudyPageResult;
