import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerTipperUser, loginUser } from "../../actions/authActions";
import classnames from "classnames";

class RegisterTipper extends Component {
	constructor() {
		super();
		this.state = {
			firstname: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
	}

	// componentDidMount() {
	// 	// If logged in and user navigates to Register page, logout
	// 	if (this.props.auth.isAuthenticated) {
	// 		this.props.logoutUser();
	// 	}
	// }

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			const { user } = nextProps.auth;
			if (user.usertype === "tipper")
			{
				this.props.history.push("/tipperdashboard");
			} else {
				this.props.history.push("/tippeedashboard");
			}
		}
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
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerTipperUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="container" style={{ paddingTop: "80px" }}>
				<div className="row">
					<div className="col s8 offset-s2">
						<Link to="/" className="btn-flat waves-effect">
							<i className="material-icons left">keyboard_backspace</i> Back to home
            			</Link>
						<div className="col s12" style={{ paddingLeft: "11.250px" }}>
							<h4>
								<b>Register</b> as a Tipper below
              				</h4>
							<p className="grey-text text-darken-1">
								Already have an account? <Link to="/login" style={{color: "#01ae9b"}}>Log in</Link>
							</p>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.name}
									error={errors.name}
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
								<button
									style={{
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
									type="submit"
									className="btn btn-large waves-effect waves-light hoverable accent-3">
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

RegisterTipper.propTypes = {
	loginUser: PropTypes.func.isRequired,
	registerTipperUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerTipperUser, loginUser }
)(withRouter(RegisterTipper));
