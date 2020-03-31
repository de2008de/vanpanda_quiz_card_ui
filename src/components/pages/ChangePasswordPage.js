import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import BigButton from "../buttons/BigButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import "../../assets/css/pages/ChangePasswordPage.css";

const userPasswordApi = "/api/v1/user/password";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "80%"
    }
}));

const ChangePasswordPage = props => {
    const classes = useStyles();
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [input, setInput] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const onChangeHandler = sFieldName => {
        return e => {
            const oNewInput = {};
            oNewInput[sFieldName] = e.target.value;
            setInput(prevState => {
                return {
                    ...prevState,
                    ...oNewInput
                };
            });
        };
    };
    const onChangePasswordHandler = () => {
        setErrorMessages({});
        let hasError = false;
        if (!input.currentPassword) {
            const error = {
                currentPassword: "Current password is required"
            };
            setErrorMessages(prevState => {
                return {
                    ...prevState,
                    ...error
                };
            });
            hasError = true;
        }

        if (!input.newPassword) {
            const error = {
                newPassword: "New password is required"
            };
            setErrorMessages(prevState => {
                return {
                    ...prevState,
                    ...error
                };
            });
            hasError = true;
        }

        if (input.newPassword !== input.confirmNewPassword) {
            const error = {
                confirmNewPassword: "Confirm password does not match"
            };
            setErrorMessages(prevState => {
                return {
                    ...prevState,
                    ...error
                };
            });
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const headers = {
            token: window.localStorage.getItem("token")
        };
        setIsWaiting(true);
        axios
            .post(ServerConfig.api.ip + userPasswordApi, {
                currentPassword: input.currentPassword,
                newPassword: input.newPassword
            }, {
                headers: headers
            })
            .then(response => {
                setIsWaiting(false);
                const success = response.data.success;
                if (success) {
                    setIsSuccess(true);
                    setSuccessMessage("Password has been changed");
                }
            })
            .catch(error => {
                setIsWaiting(false);
                if (!error.response) {
                    setErrorMessages({
                        general: "server no response"
                    });
                }
                const errorMessages = error.response.data.errorMessages;
                setErrorMessages(prevState => {
                    return {
                        ...errorMessages
                    };
                });
            });
    };
    const renderLoader = () => {
        return (
            <div className="loader-wrapper">
                <CircularProgress />
            </div>
        );
    };
    const renderSuccessMessage = () => {
        return (
            <div className="done-icon">
                <DoneIcon fontSize="large" />
            </div>
        );
    };
    const renderChangePasswordBtn = () => {
        if (isWaiting) {
            return renderLoader();
        }

        if (successMessage) {
            return renderSuccessMessage();
        }

        return (
            <BigButton
                svg={null}
                text={"Change"}
                className="button"
                onClickHandler={onChangePasswordHandler}
                disabled={isWaiting || isSuccess}
            />
        );
    };
    return (
        <div className="ChangePasswordPage">
            <div>
                <TextField
                    id="currentPassword"
                    label="Current Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("currentPassword")}
                    margin="normal"
                    error={!!errorMessages.currentPassword}
                    helperText={errorMessages.currentPassword}
                />
                <TextField
                    id="newPassword"
                    label="New Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("newPassword")}
                    margin="normal"
                    error={!!errorMessages.newPassword}
                    helperText={errorMessages.newPassword}
                />
                <TextField
                    id="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("confirmNewPassword")}
                    margin="normal"
                    error={!!errorMessages.confirmNewPassword}
                    helperText={errorMessages.confirmNewPassword}
                />
            </div>
            <div className="button-group">
                {renderChangePasswordBtn()}
            </div>
        </div>
    );
};

export default ChangePasswordPage;
