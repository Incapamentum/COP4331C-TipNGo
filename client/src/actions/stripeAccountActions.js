import axios from "axios";
import { GET_ERRORS } from "./types";

export const setupStripe = (stripeData, history) => dispatch => {
    axios
        .post("/api/stripe/editstripe", stripeData)
        // .then(res => {
        //     // Push to bank account setup
        //     history.push("/setupbank");
        // })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Convert bank account info to token and post to route that adds external account
export const setupBank = (bankData, history) => dispatch => {
    const key = require("../keys");

    // eslint-disable-next-line
    const stripe = Stripe(key.publicTestKey);

    stripe.createToken("bank_account", {
        country: "US",
        currency: "usd",
        routing_number: bankData.routing_number,
        account_number: bankData.account_number,
        account_holder_name: bankData.name,
        account_holder_type: "individual",
    }).then((result) => {
        if (result.error) {
            throw result.error;
        } else {
            const payload = {
                id: bankData.id,
                token: result.token
            };

            axios
                .post("/api/stripe/addbankaccount", payload)
                // .then(res => {
                //     history.push("/tippeedashboard");
                // })
                .catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                );
        }
    });
};