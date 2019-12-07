import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import vanpandaLogo from "../../assets/svg/vanpanda_logo.svg";
import { doAuthentication } from "../../utils/auth";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getMyStudyCard, renderStudyCards } from "../api/StudyCardsApiHelper";
import "../../assets/css/Home/HomePage.css";
import { getAxioCancelTokenSource } from "../../helpers/general";
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    headerContainer: {
        display: "flex",
        flexWrap: "wrap",
        margin: "1rem 1rem 0.5rem 1rem"
    },
    logo: {
        width: "6rem"
    },
    loadMoreWrapper: {
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto"
    },
    circularProgressWrapper: {
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto"
    }
}));

const HomePage = props => {
    doAuthentication(props.history);
    const classes = useStyles();
    const [studyCards, setStudyCards] = useState([]);
    const [hasMoreResult, setHasMoreResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isViewingCreatedByMe, setIsViewingCreatedByMe] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const getMyStudyCards = (iPageNumber, cancelToken, createdByMe) => {
        setIsLoading(true);
        getMyStudyCard(iPageNumber, cancelToken, createdByMe)
            .then(response => {
                setIsLoading(false);
                const aStudyCards = response.data.data;
                if (aStudyCards.length === 0) {
                    setHasMoreResult(false);
                    return;
                }
                setStudyCards(aPrevStudyCards => {
                    return aPrevStudyCards.concat(aStudyCards);
                });
            })
            .catch(thrown => { });
    };

    const onClickLoadMoreHandler = () => {
        setCurrentPage(prevPage => {
            return prevPage + 1;
        });
    };

    const renderLoadMoreButton = () => {
        if (!hasMoreResult) {
            return "That's all your cards :)";
        } else {
            return (
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={onClickLoadMoreHandler}
                    disabled={isLoading}
                >
                    More
                </Button>
            );
        }
    };

    const renderLoadingCircularProgress = () => {
        if (!isLoading) {
            return null;
        } else {
            return <CircularProgress />;
        }
    };

    const onChangeViewCreatedByMe = () => {
        setIsViewingCreatedByMe(prevState => {
            return !prevState;
        });
        setStudyCards([]);
        setCurrentPage(0);
        setHasMoreResult(true);
    };

    const onChangeEditModeHandler = () => {
        setIsEditMode(prevState => {
            return !prevState;
        });
    };

    useEffect(() => {
        const cancelTokenSource = getAxioCancelTokenSource();
        const cancelToken = cancelTokenSource.token;
        getMyStudyCards(currentPage, cancelToken, isViewingCreatedByMe);
        return () => {
            cancelTokenSource.cancel();
        }
    }, [currentPage, isViewingCreatedByMe]);

    return (
        <div className="HomePage">
            <div className={classes.headerContainer}>
                <div>
                    <Typography variant="h5">
                        <Box fontWeight="bold">My</Box>
                    </Typography>
                    <Typography variant="h5">
                        <Box>Study Cards</Box>
                    </Typography>
                </div>
                <div style={{ flexGrow: 1 }}></div>
                <div>
                    <img src={vanpandaLogo} className={classes.logo} alt="vanpanda_logo" />
                </div>
            </div>
            <div>
                <Switch
                    checked={isViewingCreatedByMe}
                    onChange={onChangeViewCreatedByMe}
                    color="primary"
                />
                <span>
                    Created By Me
                </span>
            </div>
            <div>
                <Switch
                    checked={isEditMode}
                    onChange={onChangeEditModeHandler}
                    color="primary"
                />
                <span>
                    Edit Mode
                </span>
            </div>
            <div className="content">
                {renderStudyCards(studyCards, isEditMode)}
            </div>
            <div className={classes.loadMoreWrapper}>
                {renderLoadMoreButton()}
            </div>
            <div className={classes.circularProgressWrapper}>
                {renderLoadingCircularProgress()}
            </div>
        </div>
    );

}

export default HomePage;
