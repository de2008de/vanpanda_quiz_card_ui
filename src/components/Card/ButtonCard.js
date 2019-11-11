import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    buttonCard: {
        display: "inline-flex",
        margin: "0.5rem",
        borderBottomColor: theme.palette.primary.main,
        borderBottomWidth: "0.3rem",
        borderBottomStyle: "solid"
    },
    svgContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    svg: {
        width: "2rem",
        height: "2rem"
    },
    text: {
        color: theme.palette.primary.main,
        textAlign: "center"
    }
}));

const ButtonCard = props => {
    const classes = useStyles();
    return (
        <Card
            className={classes.buttonCard + " ButtonCard"}
            onClick={props.onClickHandler}
        >
            <CardActionArea>
                <CardContent>
                    <div className={classes.svgContainer}>
                        <img className={classes.svg} src={props.svg} alt="" />
                    </div>
                    <Typography
                        className={classes.text}
                    >
                        {props.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ButtonCard;
