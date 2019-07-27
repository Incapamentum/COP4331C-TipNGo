import axios from "axios";

import { GET_ERRORS } from "./types";

export const setupStripe = (stripeData, history) => dispatch => {
    axios
        .post("/api/stripe/editstripe", stripeData)
        .then(res => {
            history.push("/setupbank");
        })
}
// post to route that uses stripe.accounts.update



//export const send info from SetupBank to here for tokenization
// stripe.createToken('bank_account', {
//     country: 'US',
//     currency: 'usd',
//     routing_number: '110000000',
//     account_number: '000123456789',
//     account_holder_name: 'Jenny Rosen',
//     account_holder_type: 'individual',
//   }).then(function(result) {
//     // Handle result.error or result.token
//   });

//   // response to contain bank_account token