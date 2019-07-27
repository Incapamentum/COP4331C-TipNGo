import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerTippeeUser, logoutUser } from "../../actions/authActions";
import classnames from "classnames";

class SetupStripe extends Component {
    constructor() {
        super();
        this.state = {
            phone: "",
            city: "",
            line1: "",
            line2: "",
            postal_code: "",
            state: "",
            ssn_last_4: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
    }
    
    onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
    };
    
    onSubmit = e => {
        e.preventDefault();

        const newStripeInfo = {
            phone: this.state.phone,
            city: this.state.city,
            line1: this.state.line1,
            line2: this.state.line2,
            postal_code: this.state.postal_code,
            state: this.state.state,
            ssn_last_4: this.state.ssn_last_4
        };

        this.props.setupStripe(newStripeInfo, this.props.history)
    };

    render
}


// stripe.createToken('bank_account', {
//     country: 'US',
//     currency: 'usd',
//     routing_number: '110000000',
//     account_number: '000123456789',
//     account_holder_name: 'Jenny Rosen',
//     account_holder_type: 'individual',
//   }).then(function(result) {
//     // Handle result.error or result.token
//   });

//   // response to contain bank_account token