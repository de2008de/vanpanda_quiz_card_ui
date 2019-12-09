import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import ServerConfig from "../../configs/ServerConfig";
import { isAuthenticated } from "../../utils/auth";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PaymentIcon from "@material-ui/icons/Payment";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ListIcon from '@material-ui/icons/List';
import { getAxioCancelTokenSource } from "../../helpers/general";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

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
    changePassword: {
        display: "flex",
        justifyItems: "right",
        marginLeft: "1rem",
        marginTop: "1rem"
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));

const UserProfile = props => {
    const classes = useStyles();
    const [userProfile, setUserProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let sProfileRequestUrl = ServerConfig.api.ip + userProfileApi;
    if (props.id) {
        sProfileRequestUrl = sProfileRequestUrl + "/" + props.id;
    }
    useEffect(() => {
        const cancelTokenSource = getAxioCancelTokenSource();
        const cancelToken = cancelTokenSource.token;
        const getRequestHeader = {
            token: window.localStorage.getItem("token")
        };
        if (!props.isPublic && !isAuthenticated()) {
            return;
        }
        axios
            .get(sProfileRequestUrl, {
                headers: getRequestHeader,
                cancelToken: cancelToken
            })
            .then(response => {
                setIsLoading(false);
                const oUserProfile = response.data.data;
                setUserProfile(prevState => {
                    return {
                        ...prevState,
                        ...oUserProfile
                    };
                });
            })
            .catch(thrown => { });
        return () => {
            cancelTokenSource.cancel();
        }
    }, [sProfileRequestUrl, props.isPublic]);

    const generateTableRows = () => {
        const fieldDisplayNameMap = {
            "id": "ID",
            "username": "Username",
            "email": "Email",
            "credit": "Credit",
        };
        const fieldIconMap = {
            "id": <FingerprintIcon />,
            "username": <FaceIcon />,
            "email": <MailOutlineIcon />,
            "credit": <PaymentIcon />
        }
        const purcaseCreditButton = (
            <span onClick={() => { props.history.push("/payment") }}
                style={{ marginLeft: "1rem", textDecoration: "underline" }}>
                purchase
            </span>
        );
        const aTableRows = [];
        let fieldName;
        for (fieldName in fieldDisplayNameMap) {
            if (userProfile[fieldName] === undefined || userProfile[fieldName] === null) {
                continue;
            }
            const oTableRow = (
                <TableRow key={fieldName}>
                    <TableCell className={classes.field}>
                        {fieldIconMap[fieldName] ? fieldIconMap[fieldName] : <ListIcon />}
                        {fieldDisplayNameMap[fieldName]}
                    </TableCell>
                    <TableCell>
                        {userProfile[fieldName]}
                        {fieldName === "credit" ? purcaseCreditButton : null}
                    </TableCell>
                </TableRow>
            );
            aTableRows.push(oTableRow);
        }
        return aTableRows;
    };

    const renderLoader = () => {
        if (isLoading) {
            return (
                <div className={classes.loaderContainer}>
                    <CircularProgress />
                </div>
            );
        }
    };

    return (
        <div className="UserProfile">
            <div className={classes.accountCircleIconContainer}>
                <AccountCircleIcon
                    className={classes.accountCircleIcon}
                    color="primary"
                />
            </div>
            {renderLoader()}
            <div className={classes.profileInfo}>
                <Table>
                    <TableBody>
                        {generateTableRows()}
                    </TableBody>
                </Table>
            </div>
            {
                !props.isPublic ?
                    <div className={classes.changePassword}>
                        <Link to={"/profile/change_password"}> Change Password </Link>
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default UserProfile;
