import React, { useState, useEffect } from "react";
import DetailCard from "../Card/DetailCard";
import { doAuthentication, isAuthenticated } from "../../utils/auth";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import Typography from "@material-ui/core/Typography";
import empty_box_svg from "../../assets/svg/empty_box.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    empty_page: {
        marginTop: "5rem",
        textAlign: "center"
    },
    empty_box_svg: {
        width: "10rem"
    }
});

const getBookmarkedConceptCardsApi =
    "/api/v1/bookmark/bookmarked_concept_cards";

const BookmarkPage = props => {
    doAuthentication(props.history);

    const classes = useStyles();
    const [bookmarkedConceptCards, setBookmarkedConceptCards] = useState([]);

    // TODO: Add paging to get all bookmarks
    useEffect(() => {
        if (!isAuthenticated()) {
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

    const loadBookmarkPage = () => {
        if (bookmarkedConceptCards.length !== 0) {
            return loadDetailCards();
        } else {
            return (
                <div className={classes.empty_page}>
                    <img
                        className={classes.empty_box_svg}
                        src={empty_box_svg}
                        alt=""
                    />
                    <Typography variant="h6" color="textSecondary">
                        No bookmarks
                    </Typography>
                </div>
            );
        }
    };

    return <div className="BookmarkPage">{loadBookmarkPage()}</div>;
};

export default BookmarkPage;
