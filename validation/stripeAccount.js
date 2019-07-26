const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateStripeAccountInput(data) {
	let stripeErrors = {};

	// Convert empty fields to empty string
	data.phone = !isEmpty(data.phone) ? data.phone : "";
	data.city = !isEmpty(data.city) ? data.city : "";
	data.line1 = !isEmpty(data.line1) ? data.line1 : "";
	// data.line2 = !isEmpty(data.line2) ? data.line2 : "";
	data.postal_code = !isEmpty(data.postal_code) ? data.postal_code : "";
	data.state = !isEmpty(data.state) ? data.state : "";
	data.ssn_last_4 = !isEmpty(data.ssn_last_4) ? data.ssn_last_4 : "";

	// Phone check
	if (Validator.isEmpty(data.phone)) {
		stripeErrors.phone = "Phone number is required";
	} else if (!Validator.isMobilePhone(data.phone)) {
		stripeErrors.phone = "Phone number is invalid";
	}

	// City check
	if (Validator.isEmpty(data.city)) {
		stripeErrors.city = "City is required";
	}

	// Address Line1 check
	if (Validator.isEmpty(data.line1)) {
		stripeErrors.line1 = "Address is required";
	}

	// Postal code check
	if (Validator.isEmpty(data.postal_code)) {
		stripeErrors.postal_code = "Postal code is required";
	} else if (!Validator.isPostalCode(data.postal_code)) {
		stripeErrors.postal_code = "Invalid postal code";
	}

	// State check
	if(Validator.isEmpty(data.state)) {
		stripeErrors.state = "State is required";
	}

	// SSN check
	if(Validator.isEmpty(data.ssn_last_4)) {
		stripeErrors.ssn_last_4 = "SSN last 4 are required";
	}
	
	return {
		stripeErrors,
		isValidStripe: isEmpty(stripeErrors)
	};
};
