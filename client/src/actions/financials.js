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

export const obtainBalance = (jsonUserID) => dispatch =>
{
    axios
        .post("/api/accounts/findtippee", jsonUserID)
        .then(res =>
            {
                console.log(res.data.balanceUSD/100)
                return res.data.balanceUSD/100
            })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};