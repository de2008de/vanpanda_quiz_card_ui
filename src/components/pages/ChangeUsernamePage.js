import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import BigButton from "../buttons/BigButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import "../../assets/css/pages/ChangeUsernamePage.css";

const usernameApi = "/api/v1/user/username";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "80%"
    }
}));

const ChangeUsernamePage = props => {
    const classes = useStyles();
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [input, setInput] = useState({
        username: ""
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
    const onChangeUsernameHandler = () => {
        setErrorMessages({});
        const headers = {
            token: window.localStorage.getItem("token")
        };
        setIsWaiting(true);
        axios
            .put(ServerConfig.api.ip + usernameApi, {
                username: input.username,
            }, {
                headers: headers
            })
            .then(response => {
                setIsWaiting(false);
                const success = response.data.success;
                if (success) {
                    setIsSuccess(true);
                    setSuccessMessage("Username has been changed");
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
    const renderChangeBtn = () => {
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
                onClickHandler={onChangeUsernameHandler}
                disabled={isWaiting || isSuccess}
            />
        );
    };
    return (
        <div className="ChangeUsernamePage">
            <div>
                <TextField
                    id="username"
                    label="New Username"
                    className={classes.textField}
                    value={input.username}
                    onChange={onChangeHandler("username")}
                    margin="normal"
                    error={!!errorMessages.username}
                    helperText={errorMessages.username}
                    inputProps={{
                        autoComplete: "off"
                    }}
                />
            </div>
            <div className="button-group">
                {renderChangeBtn()}
            </div>
        </div>
    );
};

export default ChangeUsernamePage;
