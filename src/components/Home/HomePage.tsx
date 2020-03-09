import '../../assets/css/Home/HomePage.css'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { CancelToken, CancelTokenSource } from 'axios'
import { History, LocationState } from 'history'

import { StudyCard } from '../../types/cards'
import { getAxioCancelTokenSource } from '../../helpers/general'
import { doAuthentication } from '../../utils/auth'
import { getMyStudyCard, renderStudyCards } from '../api/StudyCardsApiHelper'

interface Props {
    history: History<LocationState>,
};

const useStyles = makeStyles(theme => ({
    headerBackground: {
        color: "#fff",
        background: "linear-gradient(to left, #1d77d1 0%, #5ca9f7 74%)",
        padding: "1rem 0 1rem 0",
        boxShadow: "0px 5px 10px 0px #8fc7ff"
    },
    title: {
        textAlign: "center",
        fontSize: "3rem",
        marginBottom: "2rem",
        fontFamily: "Noto Sans SC",
        opacity: 0.87
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
            <div className={classes.headerBackground}>

                <div className={classes.title}>
                    My Study Cards
            </div>

                <div>
                    <Tabs
                        value={tabValue}
                        onChange={onTabChangeHandler}
                        indicatorColor="primary"
                        textColor="#fff"
                        centered
                    >

                        <Tab label="All" value="all" />
                        <Tab label="created By Me" value="createdByMe" />

                    </Tabs>
                </div>

            </div>

            <div className="cards">

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
        </div>
    );

}

export default HomePage;
