import React from "react";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import { makeStyles } from "@material-ui/core/styles";
import { borders } from "../../theme/colorPalette";

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        backgroundColor: "#fff",
        width: "100%",
        border: borders.default,
        borderRadius: "15px",
        alignItems: "center"
    },
    searchIcon: {
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 0.5rem 0.5rem 1rem"
    },
    searchInputWrapper: {
        display: "flex",
        backgroundColor: "#fff",
        width: "80%",
        paddingLeft: "0.5rem"
    },
    searchInput: {
        border: "none",
        outline: "none",
        backgroundColor: "#fff",
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
                    style={{fontSize: "1rem"}}
                    disabled={props.isInputDisabled}
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
