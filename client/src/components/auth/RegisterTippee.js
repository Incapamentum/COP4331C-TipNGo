import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerTippeeUser } from "../../actions/authActions";
import classnames from "classnames";

class RegisterTippee extends Component {
	constructor() {
		super();
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			username: "",
			password: "",
			password2: "",
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
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

		const newUser = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerTippeeUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<Link to="/" className="btn-flat waves-effect">
							<i className="material-icons left">keyboard_backspace</i> Back to home
            			</Link>
						<div className="col s12" style={{ paddingLeft: "11.250px" }}>
							<h4>
								<b>Register</b> as a Tippee below
              				</h4>
							<p className="grey-text text-darken-1">
								Already have an account? <Link to="/login" style={{ color: "#5be359" }}>Log in</Link>
							</p>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.firstname}
									error={errors.firstname}
									id="firstname"
									type="text"
									className={classnames("", {
										invalid: errors.firstname
									})}
								/>
								<label htmlFor="firstname">First Name</label>
								<span className="red-text">{errors.firstname}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.lastname}
									error={errors.lastname}
									id="lastname"
									type="text"
									className={classnames("", {
										invalid: errors.lastname
									})}
								/>
								<label htmlFor="lastname">Last Name</label>
								<span className="red-text">{errors.lastname}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.email}
									error={errors.email}
									id="email"
									type="email"
									className={classnames("", {
										invalid: errors.email
									})}
								/>
								<label htmlFor="email">Email</label>
								<span className="red-text">{errors.email}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.username}
									error={errors.username}
									id="username"
									type="text"
									className={classnames("", {
										invalid: errors.username
									})}
								/>
								<label htmlFor="username">Username</label>
								<span className="red-text">{errors.username}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.password}
									error={errors.password}
									id="password"
									type="password"
									className={classnames("", {
										invalid: errors.password
									})}
								/>
								<label htmlFor="password">Password</label>
								<span className="red-text">{errors.password}</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.password2}
									error={errors.password2}
									id="password2"
									type="password"
									className={classnames("", {
										invalid: errors.password2
									})}
								/>
								<label htmlFor="password2">Confirm Password</label>
								<span className="red-text">{errors.password2}</span>
							</div>

							<div className="col s12" style={{ paddingLeft: "11.250px" }}>
								<p className="grey-text text-darken-1">
									By registering with Tip'N'Go, you agree to both the <a target="_blank" rel="noopener noreferrer" href="https://vignette.wikia.nocookie.net/surrealmemes/images/1/17/Flawless_picardia_by_epycwyn-dbkbyfq.png/revision/latest/scale-to-width-down/220?cb=20180418235839" style={{ color: "#5be359" }}>Tip'N'Go Terms of Service </a> 
									and the <a target="_blank" rel="noopener noreferrer" href="https://stripe.com/connect-account/legal" style={{ color: "#5be359" }}>Stripe Connected Account Agreement</a>.
								</p>
								<button
									style={{
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
									type="submit"
									className="btn btn-large waves-effect waves-light hoverable green accent-3">
									Sign up
                				</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

RegisterTippee.propTypes = {
	registerTippeeUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerTippeeUser }
)(withRouter(RegisterTippee));
