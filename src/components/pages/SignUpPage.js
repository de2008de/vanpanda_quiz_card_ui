import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import CircularProgress from '@material-ui/core/CircularProgress';
import BigButton from "../buttons/BigButton";
import { validateSignupInput } from "../../helpers/validationHelper";
import "../../assets/css/pages/SignUpPage.css";

const userSignUpApi = "/api/v1/user/signup";
const INPUT_LENGTH_LIMIT = 100;

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

const SignUpPage = props => {
    const classes = useStyles();
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [isSigningUp, setIsSigningUp] = useState(false);
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
    const onSignUpHandler = () => {
        setIsSigningUp(true);
        setErrorMessages({});
        const oResult = validateSignupInput(input);
        if (!oResult.success) {
            setErrorMessages(prevErrorMessages => {
                return {
                    ...prevErrorMessages,
                    ...oResult.errorMessages
                };
            });
            setIsSigningUp(false);
            return;
        }
        axios
            .post(ServerConfig.api.ip + userSignUpApi, {
                email: input.email.trim(),
                password: input.password.trim()
            })
            .then(response => {
                setIsSigningUp(false);
                const token = response.data.token;
                window.localStorage.setItem("token", token);
                props.history.push("/success");
            })
            .catch(response => {
                setIsSigningUp(false);
                const oErrorMessages = response.response.data.errorMessages;
                setErrorMessages(prevState => {
                    return {
                        ...prevState,
                        ...oErrorMessages
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
    const renderSignUpBtn = () => {
        if (isSigningUp) {
            return renderLoader();
        }

        return (
            <BigButton
                svg={null}
                text={"Sign Up"}
                className="button"
                onClickHandler={onSignUpHandler}
                disabled={isSigningUp ? true : false}
            />
        );
    };
    return (
        <div className="SignUpPage">
            <div className="sign-in-text">
                Have a QuizCard account? <Link to="/login">Sign In</Link>
            </div>
            <form className={classes.form}>
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={input.email}
                    onChange={onChangeHandler("email")}
                    margin="normal"
                    error={!!errorMessages.email}
                    helperText={errorMessages.email}
                    inputProps = {{
                        maxLength: INPUT_LENGTH_LIMIT,
                        autoComplete: "off"
                    }}
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
                    inputProps = {{
                        maxLength: INPUT_LENGTH_LIMIT,
                        autoComplete: "off"
                    }}
                />
                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    className={classes.textField}
                    value={input.confirmPassword}
                    onChange={onChangeHandler("confirmPassword")}
                    margin="normal"
                    error={!!errorMessages.confirmPassword}
                    helperText={errorMessages.confirmPassword}
                    inputProps = {{
                        maxLength: INPUT_LENGTH_LIMIT,
                        autoComplete: "off"
                    }}
                />
                <div className="button-group">
                    {renderSignUpBtn()}
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
