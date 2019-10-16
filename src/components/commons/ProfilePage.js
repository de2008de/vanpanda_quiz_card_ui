import React, { useState, useEffect } from "react";
import { doAuthentication } from "../../utils/auth";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import UserProfile from "../users/UserProfile";

const useStyles = makeStyles(theme => ({
    logoutContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto"
    }
}));

const ProfilePage = props => {
    const [isLogout, setIsLogout] = useState(false);
    useEffect(() => {
        doAuthentication(props.history);
    }, [isLogout, props.history]);
    const classes = useStyles();
    const onLogoutHandler = () => {
        window.localStorage.removeItem("token");
        setIsLogout(true);
    };
    return (
        <div className="ProfilePage">
            <UserProfile
                history={props.history}
            />
            <div className={classes.logoutContainer}>
                <Fab
                    variant="extended"
                    size="large"
                    color="secondary"
                    aria-label="logout"
                    onClick={onLogoutHandler}
                >
                    Logout
                </Fab>
            </div>
        </div>
    );
};

export default ProfilePage;
