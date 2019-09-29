import React from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import vanpandaLogo from "../../assets/svg/vanpanda_logo_filled2.svg";

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

const SuccessPage = () => {
    const classes = useStyles();
    return (
        <div className="SuccessPage">
            <Box component="div" className={classes.iconContainer}>
                <CheckCircleIcon color="primary" fontSize="inherit" className={classes.successIcon} />
            </Box>
            <Box component="p" className={classes.successMessage}>
                Thank you! Success!
            </Box>
            <Box className={classes.logoContainer}>
                <img src={vanpandaLogo} className={classes.logo} alt="vanpanda_logo" />
            </Box>
        </div>
    );
}

export default SuccessPage;
