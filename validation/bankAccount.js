const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBankAccountInput(data) {
	let bankErrors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : "";
	data.account_number = !isEmpty(data.account_number) ? data.account_number : "";
	data.routing_number = !isEmpty(data.routing_number) ? data.routing_number : "";
	
	if (Validator.isEmpty(data.name)) {
		bankErrors.name = "Account holder's name is required";
	}
	
	if (Validator.isEmpty(data.account_number)) {
		bankErrors.account_number = "Bank account number is required";
	}
	
	if (Validator.isEmpty(data.routing_number)) {
		bankErrors.routing_number = "Routing number is required";
	}
	
	return {
		bankErrors,
		isValidBank: isEmpty(bankErrors)
	};
};