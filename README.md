Tip'N'Go is a web application for sending and receiving tips. This project is part of the requirements for completion of the course COP 4331C in the summer semester of 2019 at the University of Central Florida.

This project is implemented using the MERN software stack. A mobile version of the application was created using the Android Studio SDK.

For handling the exchange of currency and sensitive personal information, this project makes use of the Stripe API, including Stripe Connect Custom, Stripe.js plus Elements, and Stripe Customers.

Server API calls: The following is a list of calls to the server, each detailing the expected parameters of the request json object and the response from the server. Note that parameters within a request must be of the same spelling and case as the @params indicated below.



Within users.js - concerning the creation and retrieval of User documents:

    @route POST api/users/registertipper
    @desc Creates a User document, Tipper document, and Stripe Customer and saves all documents to the database. Then creates a signed JWT containing the user's authentication information.
    @params firstname, email, password, password2
    @response {
        success: Boolean,
        token: "Bearer " + jwt
    }
    NOTE: token must be decoded to retrieve the "id", "usertype", and "name" 

    @route POST api/users/registertippee
    @desc Creates a User document, Tippee document, and Stripe Connect Custom account. Sends registration information to Stripe and saves all documents. Then creates a signed JWT containing the user's authentication information.
    @params firstname, lastname, email, password, password2
    @response {
        success: Boolean,
        token: "Bearer " + jwt
    }
    NOTE: token must be decoded to retrieve the "id", "usertype", and "name"

    @route POST api/users/login
    @desc Authenticate user agianst stored information and return JWT upon success.
    @params email, password
    @response {
        success: Boolean,
        token: "Bearer " + jwt
    }
    NOTE: token must be decoded to retrieve the "id", "usertype", and "name"

    @route POST api/users/finduser
    @desc Request User document by id.
    @params id
    @response User document converted to json (see models/User.js)



Within accounts.js - Concerning the retrieval and update of Tipper and Tippee documents:

    @route POST api/accounts/findtipper
    @desc Request Tipper document by id (of associated User document).
    @params id
    @response Tipper document converted to json (see models/Tipper.js)

    @route POST api/accounts/findtippee
    @desc Request Tippee document by id (of associated User document).
    @params id
    @response Tippee document converted to json (see models/Tippee.js)

    @route api/accounts/deletetippee (NOT YET IMPLEMENTED)
    @desc Deletes or disables all information associated with user including Stripe account, Tippee document, and User document.
    @params id (of associated user)
    @response {success: Boolean}

    @route api/accounts/deletetipper (NOT YET IMPLEMENTED)
    @desc Deletes or disables all information associated with user including Stripe customer, Tipper document, and User document.
    @params id (of associated user)
    @response {success: Boolean}

    @route api/accounts/transactionhistory
    @desc Responds with array of transaction objects from either the Tipper or Tippee document (detects which type).
    @params id (of associated user)
    @response {
        success: Boolean,
        transactionHistory: [{
                transactionid: String,
                tippee: String,
                stripeAccount: String,
                tipper: String,
                stripeCustomer: String,
                date: Date,
                amount: Number (in cents)
        }]
    }

    @route POST api/accounts/searchbyusername
    @desc Retrieve Tippee account document by searching with username.
    @params username (associated with Tippee)
    @response Tippee document converted to json (see models/Tippee.js)

    @route POST api/accounts/searchbyemail
    @desc Retrieve Tippee account document by searching with email (for use with QR scanner, which encodes an email).
    @params email
    @response Tippee document converted to json (see models/Tippee.js)

    @routes POST api/accounts/searchbylocation (NOT YET IMPLEMENTED)
    @desc Retrieve Tippee account document after searching by coordinates and narrowing the search by zip code and range from coordinates.
    @params zip_code, range, latitude, longitude
    @response Tippee document converted to json (see models/Tippee.js)



Within stripe.js - Concerning the update and manipulation of varioius Stripe accounts including saving and editing recipient bank account information and payment card information.

    @route POST api/stripe/editstripe
    @desc Update details of a Stripe Connect Custom account.
    @params id (of the associated user), phone, city, line1, line2, postal_code, state,day, month, year, ssn_last_4
    NOTE FOR TESTING: only certain details are accepted by Stripe in testing mode. The following are required values:
        phone: a ten-digit number with no special characters, starting with 555
        line1: 123 State St
        line2: ""
        city: Schenectady
        state: NY
        postal_code: 12345
        ssn_last_4: 0000
    @response{
        success: Boolean
        account: {Updated Stripe Account object: https://stripe.com/docs/api/accounts/object}
    }
    
    @route POST api/stripe/addbankaccount
    @desc Add a bank account by token to an existing Stripe Connect account.
    @params id (of associated user), token (generated client-side https://stripe.com/docs/api/tokens/create_bank_account)
    NOTE FOR TESTING: only certain details are accepted by Stripe in testing mode. The following are required values (entered client-side when creating token):
        account_number: 000123456789
        routing_number: 110000000
    @response {
        success: Boolean
        bank_account: {Added bank account object: https://stripe.com/docs/api/external_account_bank_accounts/object}
    }

    @route POST api/stripe/retrievestripe
    @desc Search for Stripe Connect account by id of associated user document.
    @params id (of associated user)
    @response {account: {Stripe Connect account object: https://stripe.com/docs/api/accounts/object}}

    @route POST api/accounts/setpaymenttoken
    @desc Set a card token to a Tipper account to use in account charges.
    @params id (of associated user), token (generated client-side: https://stripe.com/docs/api/tokens/create_card)
    NOTE FOR TESTING: only certain details are accepted by Stripe in testing mode. The following are required values (entered client-side at token creation):
        number: 4242424242424242
        The CVC can be random, and the expiration date can be any future date.
    TO DELETE CARD: set "token": {"id": null} in the request json.
    @response {customer: the updated Stripe customer object: https://stripe.com/docs/api/customers/object}



Within pay.js - Concerning calls to send, receive, and transfer funds:

    @rout POST api/pay/sendtip
    @desc Send tip from Tipper's connected Stripe customer payment token to Tippee's connected Stripe account. Assumes Tipper has reusable source saved to customer object. Then saves transaction information to Tippee and Tipper documents and Transaction collection.
    @params ammount (in cents), id (of Tipper associated user), tippeeid (from Tippee object retreived in some search for Tippee)
    @response {
        success: Boolean
        charge: {New charge object: https://stripe.com/docs/api/charges/object}
    }

    @rout POST api/pay/sendguesttip
    @desc Send tip from anonymous payment token to Tippee's connected Stripe account. Then saves Transaction information to Tippee document and Transaction collection.
    @params ammount (in cents), token (generated client-side: https://stripe.com/docs/api/tokens/create_card), tippeeid (from Tippee object retreived in some search for Tippee)
    @response {
        success: Boolean
        charge: {New charge object: https://stripe.com/docs/api/charges/object}
    }

    @route POST api/stripe/payout (NOT YET IMPLEMENTED)
    @desc Transfer funds from the Stripe platform to the Tippee's connected bank.
    @params id (of associated user)
    @response {success: Boolean}