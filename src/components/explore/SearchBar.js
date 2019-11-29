import React from "react";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        backgroundColor: theme.palette.primary.light,
        width: "100%",
        borderRadius: "4px"
    },
    searchIcon: {
        padding: "0.2rem"
    },
    searchInputWrapper: {
        display: "flex",
        backgroundColor: theme.palette.primary.light,
        width: "80%",
        paddingLeft: "0.5rem"
    },
    searchInput: {
        border: "none",
        outline: "none",
        backgroundColor: theme.palette.primary.light,
        width: "100%"
    }
}));

const SearchBar = props => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper + " SearchBar"} onClick={props.onClickHandler}>
            <span className={classes.searchIcon}><SearchTwoToneIcon /></span>
            <div className={classes.searchInputWrapper}>
                <input
                    autoFocus
                    type="text"
                    placeholder={props.placeholder}
                    className={classes.searchInput + " searchInput"}
                    onChange={props.onChangeHandler}
                />
            </div>
        </div>
    );
};

export default SearchBar;
