import axios from "axios";

import { GET_ERRORS } from "./types";

// Obtains transaction history from the user
export const obtainTransHistory = () => dispatch =>
{
    axios
        .post("/api/accounts/transactionhistory")
        .then(res =>
            {
                
            })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};