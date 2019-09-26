import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Chip from "@material-ui/core/Chip";
import ErrorIcon from "@material-ui/icons/Error";
import vanPandaLogo from "../../assets/svg/vanpanda_logo_filled.svg";

const userSignUpApi = "/api/v1/user/signup";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "80%"
    },
    fabButton: {
        margin: "1rem 0.5rem 1rem 0.5rem"
    },
    form: {
        width: "90%",
        margin: "auto",
        position: "relative"
    },
    chip: {
        margin: "0.3rem"
    },
    hintText: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    logo: {
        width: "3rem",
        position: "absolute",
        bottom: 0,
        right: 0
    }
}));

const SignUpPage = props => {
    const classes = useStyles();
    const [input, setInput] = useState({
        email: "",
        username: "",
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
        if (input.password !== input.confirmPassword) {
            setErrorMessages((prevState) => {
                return {
                    ...prevState,
                    confirmPassword: "does not match"
                };
            });
            setIsSigningUp(false);
            return;
        }
        axios
            .post(ServerConfig.api.ip + userSignUpApi, {
                email: input.email,
                username: input.username,
                password: input.password
            })
            .then(response => {
                setIsSigningUp(false);
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
    const loadErrorMessages = () => {
        const aErrorChips = [];
        for (let key in errorMessages) {
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
    return (
        <div className="SignUpPage">
            <form className={classes.form}>
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={input.email}
                    onChange={onChangeHandler("email")}
                    margin="normal"
                    error={errorMessages.email ? true : false}
                />
                <TextField
                    id="username"
                    label="Username"
                    className={classes.textField}
                    value={input.username}
                    onChange={onChangeHandler("username")}
                    margin="normal"
                    error={errorMessages.username ? true : false}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("password")}
                    margin="normal"
                    error={errorMessages.password ? true : false}
                />
                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    className={classes.textField}
                    value={input.confirmPassword}
                    onChange={onChangeHandler("confirmPassword")}
                    margin="normal"
                    error={errorMessages.confirmPassword ? true : false}
                />
                <Box component="div" className={classes.hintText}>
                    <Link to="/login">Have an account? Sign in here!</Link>
                </Box>
                <Box component="div">
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="login"
                        className={classes.fabButton}
                        onClick={onSignUpHandler}
                        disabled={isSigningUp ? true : false}
                    >
                        <ExitToAppIcon />
                        Sign up
                    </Fab>
                </Box>
                {loadErrorMessages()}
                <img src={vanPandaLogo} className={classes.logo} />
            </form>
        </div>
    );
};

export default SignUpPage;
