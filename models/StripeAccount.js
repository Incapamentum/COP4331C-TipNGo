const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const stripeAccountSchema = new Schema({
	id: {
        type: String
    },
    object: {
        type: String,
        default: "account"
    },
    business_profile: {
        default: null
    },
    business_type: {
        type: String,
        default: "individual"
    },
    charges_enabled: {
        type: Boolean
    },
    country: {
        type: String,
        default: "US"
    },
    created: {
        type: Date,
        default: Date.now
    },
    default_currency: {
        type: String,
        default: "usd"
    },
    details_submitted: {
        type: Boolean
    },
    email: {
        type: String
    },
// other stuff from https://stripe.com/docs/api/accounts/object required
    tos_acceptance: {
        date: Date,
        ip: String,
        user_agent: String
    }
});

module.exports = StripeAccount = mongoose.model("stripeaccounts", stripeAccountSchema);
