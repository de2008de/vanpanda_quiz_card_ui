import React from "react";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import StudyCard from "../Card/StudyCard";
import { Link } from "react-router-dom";

const cardApi = "/api/v1/card";
const searchCardUrl = "/search/studycard";

export const convertConceptCardsArrayToMap = conceptCards => {
    const conceptCardMap = {};
    conceptCards.forEach(card => {
        const id = card.id;
        conceptCardMap[id] = card;
    });
    return conceptCardMap;
};

export const searchStudyCard = keyword => {
    const contentParam = "content=" + keyword;
    return axios
        .get(
            ServerConfig.api.ip + cardApi + searchCardUrl + "?" + contentParam
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
