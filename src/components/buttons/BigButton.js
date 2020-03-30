import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        margin: "0.5rem",
        padding: "1rem 0",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 5px 10px #e0e1e2",
        display: "flex",
        justifyContent: "center"
    },
    content: {
        margin: "auto",
        width: "5rem"
    },
    svgContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    svg: {
        width: "3rem",
        height: "3rem"
    },
    text: {
        color: "#000",
        opacity: "87%",
        textAlign: "center"
    }
}));

const BigButton = props => {
    const classes = useStyles();
    const renderSvg = () => {
        if (!props.svg) {
            return null;
        } else {
            return (
                <div className={classes.svgContainer}>
                    <img className={classes.svg} src={props.svg} alt="" />
                </div>
            );
        }
    };
    return (
        <div
            className={classes.button + " ButtonCard " + props.className}
            onClick={props.onClickHandler}
        >
            <div className={classes.content}>
                {renderSvg()}
                <Typography
                    className={classes.text}
                >
                    {props.text}
                </Typography>
            </div>
        </div>
    );
};

export default BigButton;
