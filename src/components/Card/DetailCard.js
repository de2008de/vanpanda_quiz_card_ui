import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: "#fff",
        padding: "0.5rem",
        margin: "1.5rem 0.5rem",
        borderRadius: "1rem 0.1rem 1rem 0.3rem"
    },
    content: {
        backgroundColor: "#F2F5FA",
        borderRadius: "inherit",
        padding: "1rem"
    },
    contentTitle: {
        fontFamily: theme.typography.fontFamily
    },
    contentParagraph: {
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

const DetailCard = () => {
    const classes = useStyles();

    // TODO: Will need to load bookmarked state from data source
    const [bookmarked, setBookmarked] = useState(false);

    const bookmarkOnClickHandler = () => {
        const newBookmarkState = !bookmarked;
        setBookmarked(newBookmarkState);
    };

    return (
        <div className={classes.card + " DetailCard"}>
            <div className={classes.content}>
                <div className={classes.contentTitle}>
                    <Typography variant="h6">
                        {"What is Demand definition?"}
                    </Typography>
                </div>
                <div className={classes.contentParagraph}>
                    <Typography variant="body1">
                        <ul>
                            <li>
                                {
                                    "Demand refers to consumers' desire to purchase goods and services at given prices."
                                }
                            </li>
                            <li>
                                {
                                    "Demand can mean either market demand for a specific good or aggregate demand for the total of all goods in an economy."
                                }
                            </li>
                            <li>
                                {
                                    "Demand, along with supply, determines the actual prices of goods and the volume of goods that changes hands in a market."
                                }
                            </li>
                        </ul>
                    </Typography>
                </div>
            </div>
            <div className={classes.footer}>
                <div style={{ flexGrow: "1" }}></div>
                <div className={classes.chipContainer} style={{visibility: bookmarked ? "visible" : "hidden", transition: bookmarked ? "all 1s linear" : "", opacity: bookmarked ? "1" : "0"}}>
                    <Chip 
                        icon={<BookmarkIcon />}
                        label={"Added to bookmark"}
                        variant="outlined"
                        color="secondary"
                    />
                </div>
                <BookmarksIcon
                    fontSize="large"
                    color="primary"
                    onClick={bookmarkOnClickHandler}
                />
            </div>
        </div>
    );
};

export default DetailCard;
