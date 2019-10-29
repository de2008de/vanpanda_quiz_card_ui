import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import qs from "query-string";
import ServerConfig from "../../configs/ServerConfig";
import DetailCard from "../Card/DetailCard";
import { getBookmarks, convertBookmarkArrayToMap } from "../api/BookmarkApiHelper";

const sStudyCardApi = "/api/v1/card/studycard";

const QuizPage = props => {
    const appContext = useContext(AppContext);
    const [studyCard, setStudyCard] = useState({});
    const [bookmarks, setBookmarks] = useState({});
    const [indexOfQuestion, setIndexOfQuestion] = useState(0);
    const studyCardId = qs.parse(props.location.search).id;

    useEffect(() => {
        // If we have cache, then use cache
        if (appContext && appContext.studyCard) {
            setStudyCard(appContext.studyCard);
            return;
        }
        axios
            .get(ServerConfig.api.ip + sStudyCardApi + "/" + studyCardId)
            .then(response => {
                const studyCard = response.data.data;
                setStudyCard(studyCard);
            })
            .catch(() => { });
    }, [appContext, studyCardId]);

    useEffect(() => {
        // If we have cache, then use cache
        if (appContext && appContext.bookmarks) {
            setBookmarks(appContext.bookmarks);
            return;
        }
        getBookmarks()
            .then(response => {
                const bookmarks = response.data.data.bookmarks;
                const bookmarkMap = convertBookmarkArrayToMap(bookmarks);
                setBookmarks(bookmarkMap);
            })
            .catch(() => { });
    }, [appContext]);

    const boomarkOnClickCallback = conceptCardId => {
        return () => {
            setBookmarks(bookmarks => {
                if (bookmarks[conceptCardId]) {
                    delete bookmarks[conceptCardId];
                } else {
                    bookmarks[conceptCardId] = {
                        conceptCardId: conceptCardId
                    }
                }
                return bookmarks;
            });
        }
    };

    const showQuizQuestion = () => {
        if (!studyCard.conceptCards) {
            return false;
        }
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
        const conceptCardId = conceptCard.id;
        const definition = conceptCard.definition;
        const isBookmared = bookmarks[conceptCardId];
        return (
            <DetailCard
                id={conceptCardId}
                key={conceptCardId}
                definition={definition}
                bookmarked={isBookmared}
                boomarkOnClickCallback={boomarkOnClickCallback(conceptCardId)}
            >
            </DetailCard>
        );
    };

    return (
        <div className="QuizPage">
            <div>
                {showQuizQuestion()}
            </div>
        </div>
    );
};

export default QuizPage;
