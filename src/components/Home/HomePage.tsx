import '../../assets/css/Home/HomePage.css'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { CancelToken, CancelTokenSource } from 'axios'
import { History, LocationState } from 'history'

import vanpandaLogo from '../../assets/svg/vanpanda_logo.svg'
import { StudyCard } from '../../types/cards'
import { getAxioCancelTokenSource } from '../../helpers/general'
import { doAuthentication } from '../../utils/auth'
import { getMyStudyCard, renderStudyCards } from '../api/StudyCardsApiHelper'

interface Props {
    history: History<LocationState>,
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
    const [hasMoreResult, setHasMoreResult] = useState(true);
    const [isViewingCreatedByMe, setIsViewingCreatedByMe] = useState(false);
    const [tabValue, setTabValue] = useState("all");
    const [studyCards, setStudyCards] = useState<StudyCard[]>([]);

    useEffect((): () => void => {

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

    const onTabChangeHandler = (event: React.ChangeEvent<{}>, value: any): void => {

        setTabValue(value);
        setIsViewingCreatedByMe(value === "createdByMe");
        setStudyCards([]);
        setCurrentPage(0);
        setHasMoreResult(true);

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
                <Tabs
                    value={tabValue}
                    onChange={onTabChangeHandler}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >

                    <Tab label="All" value="all" />
                    <Tab label="created By Me" value="createdByMe" />

                </Tabs>
            </div>

            <div className="content">
                {renderStudyCards(studyCards, true, props.history)}
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
