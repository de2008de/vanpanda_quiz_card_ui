import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { isAuthenticated } from "../../utils/auth";
import { addBookmark, deleteBookmark } from "../api/BookmarkApiHelper";

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: "#fff",
        padding: "0.5rem",
        margin: "0.5rem 0.5rem 1.5rem 0.5rem",
        borderRadius: "10px"
    },
    content: {
        padding: "1rem",
        position: "relative"
    },
    buttonsContainer: {
        position: "absolute",
        right: "0",
        top: "0",
        padding: "0.5rem"
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
                    color="secondary"
                    onClick={bookmarkOnClickHandler}
                />
            );
        } else {
            return (
                <StarBorderIcon
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
                <div className={classes.buttonsContainer}>
                    {getBookmarkedIcon()}
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
