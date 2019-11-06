import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    featureIcon: {
        margin: "1rem 0 0.5rem 0"
    },
    imgWrapper: {
        display: "flex",
        justifyContent: "center"
    },
    img: {
        width: "12vw",
        height: "12vw"
    },
    textWrapper: {
        textAlign: "center",
        fontSize: "3vw",
        color: theme.palette.text.secondary
    }
}));

const FeatureIcon = props => {
    const classes = useStyles();
    return (
        <div
            className={classes.featureIcon + " FeatureIcon"}
            onClick={props.onClickHandler}
        >
            <div className={classes.imgWrapper}>
                <img className={classes.img} src={props.src} alt="" />
            </div>
            <div className={classes.textWrapper}>
                <div>{props.text1}</div>
                <div>{props.text2}</div>
            </div>
        </div>
    );
};

export default FeatureIcon;
