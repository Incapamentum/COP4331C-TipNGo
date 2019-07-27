import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setupStripe } from "../../actions/authActions";
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

        const { user } = this.props.auth;

        const newStripeInfo = {
            userid: user.id,
            phone: this.state.phone,
            city: this.state.city,
            line1: this.state.line1,
            line2: this.state.line2,
            postal_code: this.state.postal_code,
            state: this.state.state,
            ssn_last_4: this.state.ssn_last_4
        };

        this.props.setupStripe(newStripeInfo, this.props.history);
    };

    // render a page to collect user information pertinent to stripe account completion
}
