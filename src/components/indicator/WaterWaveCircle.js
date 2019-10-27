import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/css/indicator/WaterWaveCircle.css";

const useStyles = makeStyles(theme => ({
    container: {
        marign: "1rem"
    },
    circle: {
        margin: "1rem",
        width: "150px",
        height: "150px",
        border: "5px solid #fff",
        boxShadow: "0 0 0 5px " + theme.palette.primary.main,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        zIndex: "2" // Fix issue where overflow: hidden does not work on Safari for rotate animation
    },
    wave: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.primary.light,
        borderRadius: "50%"
    },
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: theme.palette.text.secondary,
        fontSize: "2rem"
    },
    text: {
        zIndex: "2"
    }
}));

const WaterWaveCircle = props => {
    const classes = useStyles();

    const calculateWaveTop = percent => {
        const percentMap = {
            0: "40%",
            25: "25%",
            50: "0%",
            75: "-25%",
            90: "-40%",
            100: "-50%"
        }
        const percentSteps = [0, 25, 50, 75, 90, 100];
        let step = 0;
        for (let i = 0; i < percentSteps.length; i++) {
            if (percent <= percentSteps[i]) {
                step = percentSteps[i];
                break;
            }
        }
        const topPosition = percentMap[step];
        return topPosition;
    }

    return (
        <div className={classes.container + " WaterWaveCircle"}>
            <div className={classes.circle}>
                <div className={classes.wave + " wave"}>
                    <div className="wave-before" style={{top: calculateWaveTop(props.percent)}}></div>
                    <div className={classes.textContainer}>
                        <div className={classes.text}>{props.percent}%</div>
                    </div>
                    <div className="wave-after" style={{top: calculateWaveTop(props.percent)}}></div>
                </div>
            </div>
        </div>
    );
};

export default WaterWaveCircle;
