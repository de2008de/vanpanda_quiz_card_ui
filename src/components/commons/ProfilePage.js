import React, { useState, useEffect } from "react";
import { doAuthentication } from "../../utils/auth";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import ServerConfig from "../../configs/ServerConfig";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PaymentIcon from "@material-ui/icons/Payment";

const userProfileApi = "/api/v1/user/profile";

const useStyles = makeStyles(theme => ({
    accountCircleIcon: {
        fontSize: "8rem"
    },
    accountCircleIconContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "2rem"
    },
    profileInfo: {
        width: "90%",
        margin: "auto"
    },
    field: {
        color: theme.palette.text.secondary,
        display: "flex",
        alignItems: "center"
    },
    logout: {},
    logoutContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "3rem auto"
    }
}));

const ProfilePage = props => {
    doAuthentication(props.history);
    const classes = useStyles();
    const [userProfile, setUserProfile] = useState({
        username: "",
        email: ""
    });
    const getRequestHeader = {
        token: window.localStorage.getItem("token")
    };
    useEffect(() => {
        axios
            .get(ServerConfig.api.ip + userProfileApi, {
                headers: getRequestHeader
            })
            .then(response => {
                const oUser = response.data.data;
                setUserProfile(prevState => {
                    return {
                        ...prevState,
                        email: oUser.email,
                        username: oUser.username
                    };
                });
            });
    });
    const [isLogingOut, setIsLogingOut] = useState(false);
    const onLogoutHandler = () => {
        setIsLogingOut(true);
        window.localStorage.removeItem("token");
        setIsLogingOut(false);
    };
    return (
        <div className="ProfilePage">
            <div className={classes.accountCircleIconContainer}>
                <AccountCircleIcon
                    className={classes.accountCircleIcon}
                    color="primary"
                />
            </div>
            <div className={classes.profileInfo}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.field}>
                                <FaceIcon />
                                {"Username:"}
                            </TableCell>
                            <TableCell>{userProfile.username}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className={classes.field}>
                                <MailOutlineIcon />
                                {"Email:"}
                            </TableCell>
                            <TableCell>{userProfile.email}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className={classes.field}>
                                <PaymentIcon />
                                {"Membership:"}
                            </TableCell>
                            <TableCell>{"Gold Member"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className={classes.logoutContainer}>
                <Fab
                    variant="extended"
                    size="large"
                    color="secondary"
                    aria-label="logout"
                    className={classes.logout}
                    onClick={onLogoutHandler}
                    disabled={isLogingOut ? true : false}
                >
                    Logout
                </Fab>
            </div>
        </div>
    );
};

export default ProfilePage;
