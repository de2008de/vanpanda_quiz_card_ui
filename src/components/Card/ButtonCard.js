import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        display: "inline-block",
        margin: "0.3rem"
    },
    svgContainer: {
        display: "flex",
        justifyContent: "center"
    },
    svg: {
        width: "2rem"
    },
    text: {
        color: theme.palette.primary.main
    }
}));

const ButtonCard = props => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
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
