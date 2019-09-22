import React from "react";
import DetailCard from "../Card/DetailCard";

// Mock up data
const content =
    "Demand refers to consumers' desire to purchase goods and services at given prices.\n Demand refers to consumers' desire to purchase goods and services at given prices. ";

const BookmarkPage = () => {
    return (
        <div className="BookmarkPage">
            <DetailCard
                title={"What is Demand definition?"}
                content={content}
            />
            <DetailCard
                title={"What is Demand definition?"}
                content={content}
            />
            <DetailCard
                title={"What is Demand definition?"}
                content={content}
            />
            <DetailCard
                title={"What is Demand definition?"}
                content={content}
            />
        </div>
    );
};

export default BookmarkPage;
