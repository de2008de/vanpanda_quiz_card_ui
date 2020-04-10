import React from "react";
import PaymentForm from "../payment/PaymentForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paymentPage: {
        width: "95%",
        margin: "1rem auto"
    }
}));

const PaymentPage = props => {
    const classes = useStyles();
    return (
        <div className={classes.paymentPage}>
            <StripeProvider apiKey="pk_test_MQzgPplAUCVviY81d1itses700nQtbiGfG">
                <Elements>
                    <PaymentForm history={props.history} />
                </Elements>
            </StripeProvider>
        </div>
    );
};

export default PaymentPage;
