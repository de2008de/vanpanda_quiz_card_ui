import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ServerConfig from "../../configs/ServerConfig";
import { isAuthenticated } from "../../utils/auth";
import axios from "axios";
import { getAxioCancelTokenSource } from "../../helpers/general";
import CircularProgress from '@material-ui/core/CircularProgress';
import { isToggleOn } from "../../configs/FeatureToggle";
import { borders } from "../../theme/colorPalette";

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
    profileContainer: {
        margin: "0.5rem 1rem",
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        border: borders.default
    },
    profileTable: {
        borderCollapse: "separate",
        borderSpacing: "0.5rem"
    },
    fieldHead: {
        color: "#000",
        opacity: "67%",
        display: "flex",
        alignItems: "center"
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem"
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

    const generateProfileTable = () => {
        if (isLoading) {
            return null;
        }
        const fieldDisplayNameMap = {
            "id": "ID",
            "username": "Username",
            "email": "Email"
        };

        if (isToggleOn("CREDIT_PURCHASE_FEATURE")) {
            fieldDisplayNameMap["credit"] = "Credit";
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
                <tr key={fieldName} className={classes.row}>
                    <td>
                        <div className={classes.fieldHead}>
                            {fieldDisplayNameMap[fieldName]}
                        </div>
                        <div>
                            {userProfile[fieldName]}
                            {fieldName === "credit" ? purcaseCreditButton : null}
                        </div>
                    </td>
                </tr>
            );
            aTableRows.push(oTableRow);
        }
        return (
            <div className={classes.profileContainer}>
                <table className={classes.profileTable}>
                    <tbody>
                        {aTableRows}
                    </tbody>
                </table>
            </div>
        );
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
            {renderLoader()}
            {generateProfileTable()}
        </div>
    );
}

export default UserProfile;
