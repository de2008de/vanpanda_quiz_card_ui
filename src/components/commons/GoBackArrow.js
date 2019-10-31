import React from "react";
import { makeStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
    arrowBack: {
        margin: "0.5rem"
    }
}));

const GoBackArrow = props => {
    const classes = useStyles();
    const backArrowOnClickHandler = () => {
        props.history.goBack();
    };
    return (
        <div onClick={backArrowOnClickHandler}>
            <ArrowBackIcon
                className={classes.arrowBack}
                color="primary"
            />
        </div>
    );
};

export default GoBackArrow;
