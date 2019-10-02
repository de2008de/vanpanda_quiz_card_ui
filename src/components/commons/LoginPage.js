import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Chip from "@material-ui/core/Chip";
import ErrorIcon from "@material-ui/icons/Error";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import vanPandaLogo from "../../assets/svg/new_vanpanda_logo_draft.svg";

const userLoginApi = "/api/v1/user/login";

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
        width: "4rem",
        position: "absolute",
        bottom: 0,
        right: 0
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
    return (
        <div className="LoginPage">
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
                    id="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={input.password}
                    onChange={onChangeHandler("password")}
                    margin="normal"
                    error={errorMessages.password ? true : false}
                />
                <Box component="div" className={classes.hintText}>
                    <Link to="/signup">No account? Create one for free!</Link>
                </Box>
                <Box component="div">
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="login"
                        className={classes.fabButton}
                        onClick={onLoginHandler}
                        disabled={isLogining ? true : false}
                    >
                        <ExitToAppIcon />
                        Login
                    </Fab>
                </Box>
                {loadErrorMessages()}
                <img src={vanPandaLogo} className={classes.logo} alt="vanpanda_logo" />
            </form>
        </div>
    );
};

export default LoginPage;
