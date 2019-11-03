import React from "react";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    searchBarWrapper: {
        width: "70%",
        margin: "0.5rem 0.5rem 1rem 1rem"
    }
}));

const ExplorePage = props => {
    const classes = useStyles();
    return (
        <div className="ExplorePage">
            <div className={classes.searchBarWrapper}>
                <SearchBar />
            </div>
        </div>
    );
};

export default ExplorePage;
