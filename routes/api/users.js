const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateStripeAccountInput = require("../../validation/stripeAccount");

// Load User model
const User = require("../../models/User");
const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");

// @route POST api/users/registertipper
// @desc Register Tipper user
// @access Public
router.post("/registertipper", (req, res) => {
	// Form validation

	const { errors, isValid } = validateRegisterInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const newUser = new User({
				usertype: "tipper",
				firstname: req.body.firstname,
				email: req.body.email,
				password: req.body.password
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});

			// Create and save Tipper document for user 
			const newTipper = new Tipper({
				email: req.body.email
			});
			newTipper
				.save()
				.then(tipper => res.json(tipper))
				.catch(err => console.log(err));
		}
	});
});

// @route POST api/users/registertippee
// @desc Register Tippee user and create stripe account
// @access Public
router.post("/registertippee", (req, res) => {
	// Form validation

	const { errors, isValid } = validateRegisterInput(req.body);
	const { stripeErrors, isValidStripe } = validateStripeAccountInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	if(!isValidStripe) {
		return res.statusMessage(400).json(stripeErrors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const newUser = new User({
				usertype: "tippee",
				firstname: req.body.firstname,
				email: req.body.email,
				password: req.body.password
			});
			
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});

			// Create Tippee document for user
			const newTippee = new Tippee({
				email: req.body.email,
				userName: req.body.username
			});

			const stripe = require("stripe")(keys.secretTestKey);
			// Create stripe account on stripe server
			stripe.accounts.create({
				type: "custom",
				country: "US",
				email: req.body.email,
				business_type: "individual",
				requested_capabilities: ["card_payments"],


				tos_acceptance: {
					date: Math.floor(Date.now() / 1000),
					ip: request.connection.remoteAddress
				  }
			}, (err, account) => {
				if(err) throw err;
				// Save returned stripe account id to Tippee document
				newTippee.stripeAccount = account.id;
				newTippee
					.save()
					.then(tippee => res.json(tippee))
					.catch(err => console.log(err));
			});
		}
	});
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
	// Form validation

	const { errors, isValid } = validateLoginInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: "Email not found" });
		}

		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.userid,
					name: user.firstname
				};

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});

module.exports = router;
