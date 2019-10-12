import React, { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../assets/css/payment/paymentForm.css";
import theme from "../../theme/WCTheme";
import Typography from '@material-ui/core/Typography';
import { addParametersToUrl } from "../../helpers/urlHelper";
import LinearProgress from '@material-ui/core/LinearProgress';

import ServerConfig from "../../configs/ServerConfig";

const paymentApi = "/api/v1/payment";

const useStyles = makeStyles(theme => ({
    amountButtonContainer: {
        display: "flex",
        flexWrap: "wrap",
        margin: "1rem auto"
    },
    amountButton: {
        margin: "0.3rem 0.3rem"
    },
    amount: {
        color: theme.palette.secondary.main
    },
    hintText: {
        margin: "1rem auto"
    },
    buttonGroup: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "1rem auto"
    },
    button: {
        margin: "1rem 1rem"
    },
    cardElement: {
        margin: "1rem auto"
    },
    loader: {

    }
}));

// We need to use inline style for selected amount because
// outlined and contained variation buttons have different width
// and using class name to change style will get overridden by
// material-ui styles
const selectedAmountStyle = {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
};

const DEFAULT_AMOUNT = 5;

const PaymentForm = props => {
    const classes = useStyles();
    const [amount, setAmount] = useState(DEFAULT_AMOUNT);

    const onAmountClickedHandler = (nAmount) => {
        return () => {
            setAmount(nAmount);
        };
    };

    const onCancelHandler = () => {
        props.history.goBack();
    }

    const onSubmitHandler = async () => {
        setIsLoading(true);
        const { token } = await props.stripe.createToken({ name: "payment" });
        if (!token) {
            setIsLoading(false);
            return false;
        }
        const headers = {
            token: window.localStorage.getItem("token")
        };
        axios
            .post(
                ServerConfig.api.ip + paymentApi,
                {
                    amount: amount,
                    token: token.id
                },
                {
                    headers: headers
                }
            )
            .then(response => {
                setIsLoading(false);
                const data = response.data.data;
                const oParams = {};
                oParams.invoiceId = data.invoiceId;
                oParams.company = data.company;
                oParams.username = data.username;
                oParams.amount = data.amount;
                oParams.credit = data.credit;
                const paymentCompletedUrl = "/paymentCompleted";
                const urlWithParameter = addParametersToUrl(paymentCompletedUrl, oParams);
                props.history.push(urlWithParameter);
            });
    };

    const [isLoading, setIsLoading] = useState(false);
    const showLoader = () => {
        if (isLoading) {
            return (
                <div className={classes.loader}>
                    <LinearProgress color="primary" />
                    <Typography>We are processing your purchase</Typography>
                </div>
            );
        } else {
            return false;
        }
    }

    return (
        <div className="PaymentForm">
            <Typography variant="h6">Purchase Credit</Typography>
            <Typography variant="subtitle1">Please select an amount</Typography>
            <div className={classes.amountButtonContainer}>
                <Button
                    className={classes.amountButton}
                    style={amount === 5 ? selectedAmountStyle : {}}
                    variant="outlined"
                    color="primary"
                    onClick={onAmountClickedHandler(5)}
                >
                    $5 CAD
                </Button>
                <Button
                    className={classes.amountButton}
                    style={amount === 10 ? selectedAmountStyle : {}}
                    variant="outlined"
                    color="primary"
                    onClick={onAmountClickedHandler(10)}
                >
                    $10 CAD
                </Button>
                <Button
                    className={classes.amountButton}
                    style={amount === 20 ? selectedAmountStyle : {}}
                    variant="outlined"
                    color="primary"
                    onClick={onAmountClickedHandler(20)}
                >
                    $20 CAD
                </Button>
                <Button
                    className={classes.amountButton}
                    style={amount === 50 ? selectedAmountStyle : {}}
                    variant="outlined"
                    color="primary"
                    onClick={onAmountClickedHandler(50)}
                >
                    $50 CAD
                </Button>
                <Button
                    className={classes.amountButton}
                    style={amount === 100 ? selectedAmountStyle : {}}
                    variant="outlined"
                    color="primary"
                    onClick={onAmountClickedHandler(100)}
                >
                    $100 CAD
                </Button>
            </div>
            <Typography className={classes.hintText}>You are going to purchase <span className={classes.amount}>${amount}</span> CAD credit</Typography>

            <div className={classes.cardElement}>
                <Typography variant="subtitle1">Card Number:</Typography>
                <CardNumberElement />
            </div>

            <div className={classes.cardElement}>
                <Typography variant="subtitle1">Expiry Date:</Typography>
                <CardExpiryElement />
            </div>

            <div className={classes.cardElement}>
                <Typography variant="subtitle1">CVC:</Typography>
                <CardCVCElement />
            </div>

            <div className={classes.buttonGroup}>
                <Button className={classes.button} variant="contained" color="secondary" size="large" onClick={onCancelHandler} disabled={isLoading}>Cancel</Button>
                <Button className={classes.button} variant="contained" color="primary" size="large" onClick={onSubmitHandler} disabled={isLoading}>Purchase</Button>
            </div>
            {showLoader()}
        </div>
    );
};

export default injectStripe(PaymentForm);
