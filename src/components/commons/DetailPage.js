import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles, Typography, Box } from "@material-ui/core";
import WCBadge from "../Badge/WCBadge";
import SFUlogoSVG from "../../assets/svg/sfu_logo.svg";
import DetailCard from "../Card/DetailCard";

const useStyles = makeStyles(theme => ({
    header: {
        height: "10rem",
        backgroundColor: "#fff"
    },
    headerTitleContainer: {
        margin: "0.5rem 1rem"
    },
    arrowBack: {
        margin: "0.5rem"
    },
    svg: {
        width: "3rem"
    },
    infoBar: {
        margin: "0.5rem 0",
        display: "flex",
        alignItems: "center"
    }
}));

const DetailPage = props => {
    const classes = useStyles();

    const backArrowOnClickHandler = () => {
        props.history.goBack();
    };

    return (
        <div className="DetailPage">
            <div className={classes.header}>
                <div onClick={backArrowOnClickHandler}>
                    <ArrowBackIcon
                        className={classes.arrowBack}
                        color="primary"
                    />
                </div>
                <div className={classes.headerTitleContainer}>
                    {/* This should be retrieved from data source */}
                    <Typography variant="h5">ECON 103</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Chapter 1: Demand and Supply
                    </Typography>
                    <Box className={classes.infoBar}>
                        <WCBadge content={4} color="primary" />{" "}
                        <span style={{ margin: "0.3rem" }}>Key Concepts</span>
                        <div style={{ flexGrow: "1" }}></div>
                        <img className={classes.svg} src={SFUlogoSVG} />
                    </Box>
                </div>
            </div>
            <div className="content">
                <DetailCard />
                <DetailCard />
                <DetailCard />
                <DetailCard />
            </div>
        </div>
    );
};

export default DetailPage;
