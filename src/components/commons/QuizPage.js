import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import qs from "query-string";
import ServerConfig from "../../configs/ServerConfig";
import DetailCard from "../Card/DetailCard";

const sStudyCardApi = "/api/v1/card/studycard";

const QuizPage = props => {
    const appContext = useContext(AppContext);
    const [studyCard, setStudyCard] = useState({});
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

    const showQuizQuestion = () => {
        if (!studyCard.conceptCards) {
            return false;
        }
        const conceptCard = studyCard.conceptCards[indexOfQuestion];
        const conceptCardId = conceptCard.id;
        const definition = conceptCard.definition;

        return (
            <DetailCard
                id={conceptCardId}
                key={conceptCardId}
                definition={definition}
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
