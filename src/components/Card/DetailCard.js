import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Chip from "@material-ui/core/Chip";
import { isAuthenticated } from "../../utils/auth";
import { addBookmark, deleteBookmark } from "../api/BookmarkApiHelper";

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: "#fff",
        padding: "0.5rem",
        margin: "0.5rem 0.5rem 1.5rem 0.5rem",
        borderRadius: "1rem 0.1rem 1rem 0.3rem",
        borderWidth: "0.1rem",
        borderStyle: "solid",
        borderColor: theme.palette.primary.light
    },
    content: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: "inherit",
        padding: "1rem"
    },
    term: {
        fontFamily: theme.typography.fontFamily
    },
    definition: {
        padding: "0 1rem 0 0"
    },
    footer: {
        margin: "1rem 1rem 0 1rem",
        display: "flex",
        justifyContent: "right"
    },
    chipContainer: {
        marginRight: "3rem"
    }
}));

const ADDED_TO_BOOKMARK_TEXT = "Added to bookmark";
const REMOVED_TO_BOOKMARK_TEXT = "Removed bookmark";
const PLEASE_LOGIN_TEXT = "Please login to add bookmark";

const DetailCard = props => {
    const classes = useStyles();
    const [bookmarked, setBookmarked] = useState(false);
    const [chipText, setChipText] = useState("");
    const [isChipVisible, setIsChipVisible] = useState(false);

    // Since our initial bookmarked state relies on props.bookmarked,
    // we need to use side effect to update our state so that it will re-render
    // and prevent infinite re-rendering
    useEffect(() => {
        if (props.bookmarked) {
            setBookmarked(true);
        }
    }, [props.bookmarked]);

    const bookmarkOnClickHandler = () => {
        if (!isAuthenticated()) {
            setChipText(PLEASE_LOGIN_TEXT);
            setIsChipVisible(true);
            return;
        }
        const conceptCardId = props.id;
        if (!bookmarked) {
            setBookmarked(true);
            setChipText(ADDED_TO_BOOKMARK_TEXT);
            setIsChipVisible(true);
            addBookmark(conceptCardId)
                .then(() => { })
                .catch(() => { });
        } else {
            setBookmarked(false);
            setChipText(REMOVED_TO_BOOKMARK_TEXT);
            setIsChipVisible(true);
            deleteBookmark(conceptCardId)
                .then(() => { })
                .catch(() => { });
        }
        if (props.boomarkOnClickCallback) {
            props.boomarkOnClickCallback();
        }
    };

    const getBookmarkedIcon = () => {
        if (bookmarked) {
            return (
                <BookmarkIcon
                    fontSize="large"
                    color="secondary"
                    onClick={bookmarkOnClickHandler}
                />
            );
        } else {
            return (
                <BookmarkBorderIcon
                    fontSize="large"
                    color="primary"
                    onClick={bookmarkOnClickHandler}
                />
            );
        }
    };

    return (
        <div className={classes.card + " DetailCard"}>
            <div className={classes.content}>
                <div className={classes.term}>
                    <Typography variant="h6">{props.term}</Typography>
                </div>
                <div className={classes.definition}>
                    <Typography variant="body1">{props.definition}</Typography>
                </div>
            </div>
            <div className={classes.footer}>
                <div style={{ flexGrow: "1" }}></div>
                <div
                    className={classes.chipContainer}
                    style={{
                        visibility: isChipVisible ? "visible" : "hidden",
                        transition: isChipVisible ? "all 1s linear" : "",
                        opacity: isChipVisible ? "1" : "0"
                    }}
                >
                    <Chip
                        icon={<BookmarkIcon />}
                        label={chipText}
                        variant="outlined"
                        color="secondary"
                    />
                </div>
                {getBookmarkedIcon()}
            </div>
        </div>
    );
};

export default DetailCard;
