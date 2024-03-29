const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//const passport = require("passport");

// Load input validation
const validateTippeeRegisterInput = require("../../validation/registerTippee");
const validateTipperRegisterInput = require("../../validation/registerTipper");
const validateLoginInput = require("../../validation/login");

// Load models
const User = require("../../models/User");
const Tippee = require("../../models/Tippee");
const Tipper = require("../../models/Tipper");

//	@route POST api/users/registertipper
//  @desc Creates a User document, Tipper document, and Stripe Customer and saves all
//        documents to the database. Then creates a signed JWT containing the user's
//        authentication information.
//  @params firstname, email, password, password2
router.post("/registertipper", (req, res) => {
	// Form validation
	const { errors, isValid } = validateTipperRegisterInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			// Create User document
			const newUser = new User({
				usertype: "tipper",
				firstname: req.body.firstname,
				email: req.body.email,
				password: req.body.password
			});

			// Create Tipper document for user 
			const newTipper = new Tipper({
				name: req.body.firstname,
				email: req.body.email,
				userid: newUser.id
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.accountid = newTipper.id;
					
					// Save new user to database
					newUser
						.save()
						//.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});

			const stripe = require("stripe")(keys.secretTestKey);

			stripe.customers.create({
				description: "Tip'N'Go customer for " + req.body.email,
				name: req.body.firstname,
				email: req.body.email
			}, (err, customer) => {
				if (err) throw err;

				// Save new customer id to tipper and tipper to database
				newTipper.stripeCustomer = customer.id;
				newTipper
					.save()
					.catch(err => console.log(err));
			});

			// Create JWT Payload
			const payload = {
				id: newUser._id,
				usertype: newUser.usertype,
				name: newUser.firstname
			};

			// Sign token
			jwt.sign(
				payload,
				keys.secretOrKey,
				{
					expiresIn: 31556926 // 1 year in seconds
				}, (err, token) => {
					res.json({
						success: true,
						token: "Bearer " + token
					});
				}
			);
		}
	});
});

// @route POST api/users/registertippee
// @desc Creates a User document, Tippee document, and Stripe Connect Custom account.
//       Sends registration information to Stripe and saves all documents. Then 
//       creates a signed JWT containing the user's authentication information.
// @params firstname, lastname, email, password, password2
router.post("/registertippee", (req, res) => {
	// Form validation
	const { errors, isValid } = validateTippeeRegisterInput(req.body);
	
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			// Create user document
			const newUser = new User({
				usertype: "tippee",
				firstname: req.body.firstname,
				email: req.body.email,
				password: req.body.password
			});

			// Create Tippee document for user
			const newTippee = new Tippee({
				name: req.body.firstname,
				email: req.body.email,
				userName: req.body.username,
				userid: newUser.id
			});
			
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.accountid = newTippee.id;

					// Save user document
					newUser
						.save()
						//.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});

			const stripe = require("stripe")(keys.secretTestKey);

			// Create stripe account on stripe server
			stripe.accounts.create({
				type: "custom",
				country: "US",
				email: req.body.email,
				business_type: "individual",
				business_profile: {
					mcc: "1520",
					product_description: "General services"
				},
				requested_capabilities: ["card_payments"],
				individual: {
					first_name: req.body.firstname,
					last_name: req.body.lastname,
					email: req.body.email,
				},
				tos_acceptance: {
					date: Math.floor(Date.now() / 1000),
					ip: req.connection.remoteAddress
				  }
			}, (err, account) => {
				if(err) throw err;

				// Save returned stripe account id to Tippee document
				newTippee.stripeAccount = account.id;
				newTippee
					.save()
					.catch(err => console.log(err));
			});

			// Create JWT Payload
			const payload = {
				id: newUser._id,
				usertype: newUser.usertype,
				name: newUser.firstname
			};

			// Sign token
			jwt.sign(
				payload,
				keys.secretOrKey,
				{
					expiresIn: 31556926 // 1 year in seconds
				}, (err, token) => {
					res.json({
						success: true,
						token: "Bearer " + token
					});
				}
			);
		}
	});
});

// @route POST api/users/login
// @desc Authenticate user agianst stored information and return JWT upon success.
// @params email, password
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
					id: user._id,
					usertype: user.usertype,
					name: user.firstname
				};

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					}, (err, token) => {
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

// @route POST api/users/finduser
// @desc Request User document by id
// @params id
router.post("/finduser", (req, res) => {
    const _id = req.body.id;

    User.findOne({ _id }).then(user => {
        if (!user) {
            return res.status(404).json({ usernotfound: "User not found" });
        }
        res.json(user);
    });
});

module.exports = router;
