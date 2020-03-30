import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { isAuthenticated } from "../../utils/auth";
import { addBookmark, deleteBookmark } from "../api/BookmarkApiHelper";
import { colors, borders } from "../../theme/colorPalette";

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: "#fff",
        padding: "0.5rem",
        margin: "0.5rem 0.5rem 0.5rem 0.5rem",
        borderRadius: "10px",
        border: borders.default
    },
    content: {
        padding: "1rem",
        position: "relative"
    },
    buttonsContainer: {
        color: colors.Tangerine,
        position: "absolute",
        right: "0",
        top: "0",
        padding: "0.5rem"
    },
    term: {
        fontFamily: theme.typography.fontFamily,
        width: "90%",
        color: "#000",
        fontSize: "1.2rem",
        opacity: "87%"
    },
    definition: {
        fontFamily: theme.typography.fontFamily,
        padding: "0 1rem 0 0",
        color: "#000",
        opacity: "87%"
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

const DetailCard = props => {
    const classes = useStyles();
    const [bookmarked, setBookmarked] = useState(false);

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
            return;
        }
        const conceptCardId = props.id;
        if (!bookmarked) {
            setBookmarked(true);
            addBookmark(conceptCardId)
                .then(() => { })
                .catch(() => { });
        } else {
            setBookmarked(false);
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
                <StarIcon
                    fontSize="large"
                    color="inherit"
                    onClick={bookmarkOnClickHandler}
                />
            );
        } else {
            return (
                <StarBorderIcon
                    fontSize="large"
                    color="inherit"
                    onClick={bookmarkOnClickHandler}
                />
            );
        }
    };

    return (
        <div className={classes.card + " DetailCard"}>
            <div className={classes.content}>
                <div className={classes.term}>
                    {props.term}
                </div>
                <div className={classes.definition}>
                    {props.definition}
                </div>
                <div className={classes.buttonsContainer + " bookmark-icon"}>
                    {getBookmarkedIcon()}
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
