const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBankAccountInput(data) {
	let bankErrors = {};

	


	return {
		bankErrors,
		isValidBankInfo: isEmpty(bankErrors)
	};
};
