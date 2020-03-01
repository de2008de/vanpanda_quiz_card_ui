import React, { useState, useEffect } from "react";

import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";

import { CancelToken, CancelTokenSource } from "axios";
import { makeStyles } from "@material-ui/core";
import { doAuthentication } from "../../utils/auth";
import { getAxioCancelTokenSource } from "../../helpers/general";
import { getMyStudyCard, renderStudyCards } from "../api/StudyCardsApiHelper";

import { StudyCard } from "../../types/cards";

import vanpandaLogo from "../../assets/svg/vanpanda_logo.svg";

import "../../assets/css/Home/HomePage.css";

interface Props {
    history: History,
};

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

const HomePage = (props: Props) => {

    doAuthentication(props.history);

    const classes = useStyles({});

    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [hasMoreResult, setHasMoreResult] = useState(true);
    const [isViewingCreatedByMe, setIsViewingCreatedByMe] = useState(false);
    const [studyCards, setStudyCards] = useState<StudyCard[]>([]);

    useEffect((): () => void  => {

        const cancelTokenSource: CancelTokenSource = getAxioCancelTokenSource();
        const cancelToken: CancelToken = cancelTokenSource.token;

        getMyStudyCards(currentPage, cancelToken, isViewingCreatedByMe);

        return () => {

            cancelTokenSource.cancel();

        }

    }, [currentPage, isViewingCreatedByMe]);

    const getMyStudyCards = (pageNumber: number, cancelToken: CancelToken, createdByMe: boolean): void => {
        
        setIsLoading(true);

        getMyStudyCard(pageNumber, cancelToken, createdByMe)
            .then(response => {

                setIsLoading(false);

                const studyCards: StudyCard[] = response.data.data;

                if (studyCards.length === 0) {

                    setHasMoreResult(false);
                    return;

                }

                setStudyCards(prevStudyCards => {

                    return prevStudyCards.concat(studyCards);

                });

            })
            .catch(thrown => { });

    };

    const onClickLoadMoreHandler = (): void => {

        setCurrentPage(prevPage => {
            return prevPage + 1;
        });

    };

    const renderLoadMoreButton = (): JSX.Element => {

        if (!hasMoreResult) {

            return (
                <div>
                    <p>That's all your cards :)</p>
                </div>
            );

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

    const renderLoadingCircularProgress = (): JSX.Element | null => {

        if (!isLoading) {

            return null;

        } else {

            return <CircularProgress />;

        }

    };

    const onChangeViewCreatedByMe = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {

        setIsViewingCreatedByMe(checked);
        setStudyCards([]);
        setCurrentPage(0);
        setHasMoreResult(true);

    };

    const onChangeEditModeHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {

        setIsEditMode(checked);

    };

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
