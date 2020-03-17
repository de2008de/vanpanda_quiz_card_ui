import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import CircularProgress from '@material-ui/core/CircularProgress';

const userPasswordApi = "/api/v1/user/password";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "80%"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "1rem"
    },
    chip: {
        margin: "0.3rem"
    },
    messagesArea: {
        display: "flex",
        justifyContent: "center"
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
    const loadErrorMessages = () => {
        const aErrorChips = [];
        let key;
        for (key in errorMessages) {
            const oChip = (
                <div key={key}>
                    <Chip
                        className={classes.chip}
                        icon={<ErrorIcon />}
                        color="secondary"
                        label={key + ": " + errorMessages[key]}
                        variant="outlined"
                    />
                </div>
            );
            aErrorChips.push(oChip);
        }
        return aErrorChips;
    };

    const renderSuccessMessage = () => {
        if (successMessage) {
            return (
                <div>
                    <Chip
                        className={classes.chip}
                        color="primary"
                        label={successMessage}
                        variant="default"
                    />
                </div>
            );
        }
    };

    const onChangePasswordHandler = () => {
        setErrorMessages({});
        if (!input.currentPassword) {
            const error = {
                currentPassword: "is required"
            };
            setErrorMessages(prevState => {
                return {
                    ...prevState,
                    ...error
                };
            });
            return;
        }

        if (input.newPassword !== input.confirmNewPassword) {
            const error = {
                confirmNewPassword: "does not match"
            };
            setErrorMessages(prevState => {
                return {
                    ...prevState,
                    ...error
                };
            });
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
                    error={errorMessages.currentPassword ? true : false}
                />
                <TextField
                    id="newPassword"
                    label="New Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("newPassword")}
                    margin="normal"
                    error={errorMessages.newPassword ? true : false}
                />
                <TextField
                    id="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("confirmNewPassword")}
                    margin="normal"
                    error={errorMessages.confirmNewPassword ? true : false}
                />
            </div>
            <div className={classes.messagesArea}>
                {loadErrorMessages()}
                {renderSuccessMessage()}
                {isWaiting ? <CircularProgress /> : null}
            </div>
            <div className={classes.buttonContainer}>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={onChangePasswordHandler}
                    disabled={isWaiting || isSuccess}
                >
                    Change Password
                </Button>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
