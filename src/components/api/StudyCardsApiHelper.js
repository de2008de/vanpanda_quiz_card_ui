import React from "react";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import StudyCard from "../Card/StudyCard";
import { Link } from "react-router-dom";

const cardApi = "/api/v1/card";
const searchCardUrl = "/search/studycard";
const getMyStudyCardApi = "/api/v1/card/my_study_cards";

export const getMyStudyCard = (iPageNumber, cancelToken) => {
    const requestHeader = {
        token: window.localStorage.getItem("token")
    };
    return axios
        .get(ServerConfig.api.ip + getMyStudyCardApi + "?page=" + iPageNumber, {
            headers: requestHeader,
            cancelToken: cancelToken
        });
};

export const convertConceptCardsArrayToMap = conceptCards => {
    const conceptCardMap = {};
    conceptCards.forEach(card => {
        const id = card.id;
        conceptCardMap[id] = card;
    });
    return conceptCardMap;
};

export const searchStudyCard = (keyword, pageNumber = 0) => {
    const contentParam = "content=" + keyword;
    const pageParam = "page=" + pageNumber;
    return axios
        .get(
            ServerConfig.api.ip + cardApi + searchCardUrl + "?" + contentParam + "&" + pageParam
        );
};

export const renderStudyCards = aStudyCards => {
    const aStudyCardComponents = [];
    aStudyCards.forEach(oStudyCard => {
        const cardComponent = (
            <Link
                to={"/detail?id=" + oStudyCard.id}
                className="cardLink"
                key={oStudyCard.id}
            >
                <StudyCard
                    key={oStudyCard.id}
                    title={oStudyCard.title}
                    description={oStudyCard.description}
                    school={oStudyCard.school}
                    conceptCards={oStudyCard.conceptCards}
                    username={oStudyCard.username}
                />
            </Link>
        );
        aStudyCardComponents.push(cardComponent);
    });
    return aStudyCardComponents;
};
