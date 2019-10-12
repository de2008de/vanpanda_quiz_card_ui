import React from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    iconContainer: {
        fontSize: "15rem"
    },
    successIcon: {
        margin: "2rem auto",
        display: "block"
    },
    successMessage: {
        textAlign: "center",
        ...theme.typography.h6,
        color: theme.palette.primary.light

    },
    logoContainer: {
        display: "flex",
        justifyContent: "center"
    },
    logo: {
        width: "10rem"
    }
}));

const SuccessPage = props => {
    const classes = useStyles();
    return (
        <div className="SuccessPage">
            <Box component="div" className={classes.iconContainer}>
                <CheckCircleIcon color="primary" fontSize="inherit" className={classes.successIcon} />
            </Box>
            <Box component="p" className={classes.successMessage}>
                Thank you! Success!
            </Box>
        </div>
    );
}

export default SuccessPage;
