import React, { useState, useEffect } from "react";
import DetailCard from "../Card/DetailCard";
import { doAuthentication, isAuthenticated } from "../../utils/auth";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";

const getBookmarkedConceptCardsApi =
    "/api/v1/bookmark/bookmarked_concept_cards";

const BookmarkPage = props => {
    doAuthentication(props.history);

    const [bookmarkedConceptCards, setBookmarkedConceptCards] = useState([]);

    // TODO: Add paging to get all bookmarks
    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        const headers = {
            token: window.localStorage.getItem("token")
        };
        axios
            .get(ServerConfig.api.ip + getBookmarkedConceptCardsApi, {
                headers: headers
            })
            .then(response => {
                const aConceptCards = response.data.data;
                setBookmarkedConceptCards(aConceptCards);
            });
    }, []);

    const loadDetailCards = () => {
        const aDetailCards = [];
        bookmarkedConceptCards.forEach(oConceptCard => {
            const oDetailCard = (
                <DetailCard
                    id={oConceptCard.id}
                    key={oConceptCard.id}
                    title={oConceptCard.title}
                    content={oConceptCard.content}
                    bookmarked
                />
            );
            aDetailCards.push(oDetailCard);
        });
        return aDetailCards;
    };

    return <div className="BookmarkPage">{loadDetailCards()}</div>;
};

export default BookmarkPage;
