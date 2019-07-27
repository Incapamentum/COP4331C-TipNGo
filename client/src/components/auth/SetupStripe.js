import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setupStripe } from "../../actions/stripeAccountActions";
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
            dob: "",
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
        const dob = new Date(this.state.dob);
        var year = dob.getFullYear();
        var month = dob.getMonth();
        var day = dob.getDate();

        const newStripeInfo = {
            userid: user.id,
            phone: this.state.phone,
            city: this.state.city,
            line1: this.state.line1,
            line2: this.state.line2,
            postal_code: this.state.postal_code,
            state: this.state.state,
            ssn_last_4: this.state.ssn_last_4,
            dob: this.state.dob,
            day: day,
            month: month,
            year: year
        };

        this.props.setupStripe(newStripeInfo, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<div className="col s12" style={{ paddingLeft: "11.250px" }}>
							<h4>
								We'll need some information to set up your Stripe account.
              				</h4>
							<p className="grey-text text-darken-1">
								Tip'N'Go uses Stripe to manage transactions.
							</p>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.dob}
									error={errors.dob}
									id="dob"
									type="date"
									className={classnames("", {
										invalid: errors.dob
									})}
								/>
								<label htmlFor="dob">Date of Birth</label>
								<span className="red-text">{errors.dob}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.line1}
									error={errors.line1}
									id="line1"
									type="text"
									className={classnames("", {
										invalid: errors.line1
									})}
								/>
								<label htmlFor="line1">Address - Line 1</label>
								<span className="red-text">{errors.line1}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.line2}
									error={errors.line2}
									id="line2"
									type="text"
									className={classnames("", {
										invalid: errors.line2
									})}
								/>
								<label htmlFor="line2">Address - Line 2</label>
								<span className="red-text">{errors.line2}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.city}
									error={errors.city}
									id="city"
									type="text"
									className={classnames("", {
										invalid: errors.city
									})}
								/>
								<label htmlFor="city">City</label>
								<span className="red-text">{errors.city}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.state}
									error={errors.state}
									id="state"
									type="text"
									className={classnames("", {
										invalid: errors.state
									})}
								/>
								<label htmlFor="state">State</label>
								<span className="red-text">{errors.state}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.postal_code}
									error={errors.postal_code}
									id="postal_code"
									type="number"
									className={classnames("", {
										invalid: errors.postal_code
									})}
								/>
								<label htmlFor="postal_code">Zip Code</label>
								<span className="red-text">{errors.postal_code}</span>
							</div>
                            <div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.phone}
									error={errors.phone}
									id="phone"
									type="number"
									className={classnames("", {
										invalid: errors.phone
									})}
								/>
								<label htmlFor="phone">Phone Number</label>
								<span className="red-text">{errors.phone}</span>
							</div>
                            <div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.ssn_last_4}
									error={errors.ssn_last_4}
									id="ssn_last_4"
									type="password"
									className={classnames("", {
										invalid: errors.ssn_last_4
									})}
								/>
								<label htmlFor="ssn_last_4">SSN Last 4</label>
								<span className="red-text">{errors.ssn_last_4}</span>
							</div>
							<div className="col s12" style={{ paddingLeft: "11.250px" }}>
								<button
									style={{
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
									type="submit"
									className="btn btn-large waves-effect waves-light hoverable green accent-3">
									Continue
                				</button>
							</div>
						</form>
					</div>
				</div>
			</div>
        );
    }
}

SetupStripe.propTypes = {
    setupStripe: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { setupStripe }
)(withRouter(SetupStripe));