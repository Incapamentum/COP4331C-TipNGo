import axios from "axios";

import { GET_ERRORS } from "./types";

// Obtains transaction history from the user
export const obtainTransHistory = () => dispatch =>
{
    axios
        .post("/api/accounts/transactionhistory")
        .then(console.log("Test"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};