const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateStripeAccountInput(data) {
	let stripeErrors = {};

	


	return {
		stripeErrors,
		isValidStripe: isEmpty(stripeErrors)
	};
};
