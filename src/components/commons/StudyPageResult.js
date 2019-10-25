import React from "react";
import qs from "query-string";
import DetailCard from "../Card/DetailCard";

const StudyPageResult = props => {
    const result = JSON.parse(qs.parse(props.location.search).result);
    
    const getTotalScore = result => {
        const totalConceptCards = result.masteredConceptCard.length + result.needImprovementConceptCard.length;
        const numMasteredConceptCard = result.masteredConceptCard.length;
        const score = Math.ceil(numMasteredConceptCard / totalConceptCards * 100);
        return score;
    }

    return (
        <div className="StudyPageResult">
            Your score is { getTotalScore(result) }%
        </div>
    );
};

export default StudyPageResult;
