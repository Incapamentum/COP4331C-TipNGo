import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setupBank } from "../../actions/stripeAccountActions";
import classnames from "classnames";

class SetupBank extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            routing_number: "",
            account_number: "",
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

        const newBankData = {
            id: user.id,
            name: this.state.name,
            routing_number: this.state.routing_number,
            account_number: this.state.account_number
        };

		this.props.setupBank(newBankData, this.props.history);
		
		this.props.history.push("/tippeedashboard");
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container" style={{ paddingTop: "80px" }}>
				<div className="row">
					<div className="col s8 offset-s2">
						<div className="col s12" style={{ paddingLeft: "11.250px" }}>
							<h4>
								Finally, you'll need a <b>bank account</b> to deposit your tips.
              				</h4>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.name}
									error={errors.name}
									id="name"
									type="text"
									className={classnames("", {
										invalid: errors.name
									})}
								/>
								<label htmlFor="name">Account Holder's Name</label>
								<span className="red-text">{errors.name}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.account_number}
									error={errors.account_number}
									id="account_number"
									type="number"
									className={classnames("", {
										invalid: errors.account_number
									})}
								/>
								<label htmlFor="account_number">Account Number</label>
								<span className="red-text">{errors.account_number}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.routing_number}
									error={errors.routing_number}
									id="routing_number"
									type="number"
									className={classnames("", {
										invalid: errors.routing_number
									})}
								/>
								<label htmlFor="routing_number">Routing Number</label>
								<span className="red-text">{errors.routing_number}</span>
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
									className="btn btn-large waves-effect waves-light hoverable accent-3">
									Complete Registration
                				</button>
							</div>
						</form>
					</div>
				</div>
			</div>
        );
    }
}

SetupBank.propTypes = {
    setupBank: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { setupBank }
)(withRouter(SetupBank));