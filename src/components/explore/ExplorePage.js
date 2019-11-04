import React from "react";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const useStyles = makeStyles(theme => ({
    searchBarWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        margin: "0.5rem 0.5rem 1rem 1rem"
    },
    mailIcon: {
        marginLeft: "0.5rem"
    }
}));

const ExplorePage = props => {
    const classes = useStyles();

    const getSearchBarPlaceholder = () => {
        return "BC驾照笔试";
    };

    return (
        <div className="ExplorePage">
            <div className={classes.searchBarWrapper}>
                <SearchBar placeholder={getSearchBarPlaceholder()} />
                <MailOutlineIcon className={classes.mailIcon} />
            </div>
        </div>
    );
};

export default ExplorePage;
