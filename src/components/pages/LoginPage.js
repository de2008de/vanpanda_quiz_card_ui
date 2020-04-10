import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import BigButton from "../buttons/BigButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";
import "../../assets/css/pages/LoginPage.css";

const userLoginApi = "/api/v1/user/login";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "80%"
    },
    form: {
        width: "90%",
        margin: "auto",
        position: "relative"
    }
}));

const LoginPage = props => {
    const classes = useStyles();
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [isLogining, setIsLogining] = useState(false);
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
    const onLoginHandler = () => {
        setIsLogining(true);
        setErrorMessages({});

        let hasError = false;
        if (!input.email) {
            setErrorMessages(prevState => {
                return {
                    ...prevState,
                    email: "Email is required"
                };
            });
            hasError = true;
        }
 
        if (!input.password) {
            setErrorMessages(prevState => {
                return {
                    ...prevState,
                    password: "Password is required"
                };
            });
            hasError = true;
        }

        if (hasError) {
            setIsLogining(false);
            return;
        }

        axios
            .post(ServerConfig.api.ip + userLoginApi, {
                email: input.email,
                password: input.password
            })
            .then(response => {
                setIsLogining(false);
                const token = response.data.token;
                window.localStorage.setItem("token", token);
                props.history.push("/success");
            })
            .catch(response => {
                setIsLogining(false);
                const generalErrorMessage = response.response.data.errorMessages.general;
                setErrorMessages(prevState => {
                    return {
                        ...prevState,
                        general: generalErrorMessage
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
    const renderSignInBtn = () => {
        if (isLogining) {
            return renderLoader();
        }

        return (
            <BigButton
                svg={null}
                text={"Sign In"}
                className="button"
                onClickHandler={onLoginHandler}
                disabled={isLogining ? true : false}
            />
        );
    };
    return (
        <div className="LoginPage">
            <div className="sign-up-text">
                New to QuizCard? <Link to="/signup">Sign Up</Link>
            </div>
            <form className={classes.form}>
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={input.email}
                    onChange={onChangeHandler("email")}
                    margin="normal"
                    inputProps={{
                        autoComplete: "off"
                    }}
                    error={!!errorMessages.email || !!errorMessages.general}
                    helperText={errorMessages.email || errorMessages.general}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("password")}
                    margin="normal"
                    error={!!errorMessages.password}
                    helperText={errorMessages.password}
                />
                <div className="forgot-password-wrapper">
                    <Link to="/forgot_password">
                        Forgot Password?
                    </Link>
                </div>
                <div className="button-group">
                    {renderSignInBtn()}
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
