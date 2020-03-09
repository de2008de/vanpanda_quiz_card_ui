import React from "react";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import StudyCard from "../Card/StudyCard";

const cardApi = "/api/v1/card";
const searchCardUrl = "/search/studycard";
const getStudyCardsCreatedByMeApi = "/study_cards_created_by_me";
const myStudyCardsApi = "/my_study_cards";

export const getMyStudyCard = (iPageNumber, cancelToken, isCreatedByMe = true) => {
    let requestApiUrl = "";
    if (isCreatedByMe) {
        requestApiUrl = getStudyCardsCreatedByMeApi;
    } else {
        requestApiUrl = myStudyCardsApi;
    }
    const requestHeader = {
        token: window.localStorage.getItem("token")
    };
    return axios
        .get(ServerConfig.api.ip + cardApi + requestApiUrl + "?page=" + iPageNumber, {
            headers: requestHeader,
            cancelToken: cancelToken
        });
};

export const collectStudyCard = studyCardId => {
    const requestHeader = {
        token: window.localStorage.getItem("token")
    };
    return axios.post(ServerConfig.api.ip + cardApi + myStudyCardsApi, {
        studyCardId: studyCardId
    }, {
        headers: requestHeader
    });
};

export const removeStudyCardFromCollection = studyCardId => {
    const requestHeader = {
        token: window.localStorage.getItem("token")
    };
    return axios
        .delete(ServerConfig.api.ip + cardApi + myStudyCardsApi, {
            headers: requestHeader,
            data: {
                studyCardId: studyCardId
            }
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

export const renderStudyCards = (aStudyCards, isEditMode = false, history = null) => {
    const aStudyCardComponents = [];
    aStudyCards.forEach(oStudyCard => {
        const cardComponent = (
            <StudyCard
                key={oStudyCard.id}
                id={oStudyCard.id}
                history={history}
                editMode={isEditMode}
                title={oStudyCard.title}
                description={oStudyCard.description}
                school={oStudyCard.school}
                conceptCards={oStudyCard.conceptCards}
                username={oStudyCard.username}
            />
        );
        aStudyCardComponents.push(cardComponent);
    });
    return aStudyCardComponents;
};
