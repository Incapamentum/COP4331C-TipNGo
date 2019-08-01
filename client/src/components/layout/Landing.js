import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
	
	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			const { user } = this.props.auth;
			if (user.usertype === "tipper")
			{
				this.props.history.push("/tipperdashboard");
			} else {
				this.props.history.push("/tippeedashboard");
			}
		}
	}

	render() {
		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="col s12 center-align">
						<h4 style={{ paddingTop: "50px" }}>
							Welcome to Tip'N'Go
            			</h4>
						<p className="flow-text grey-text text-darken-1">
							Have you encountered exemplary service from a host or hostess? Maybe a service industry worker impressed you with their dedication, or a performer blew you away with their skill. <br/>
							Or are you a worker tired of hearing the line "I'd leave a tip, but I forgot cash?" Create an account with Tip'N'Go to make sending and receiving tips hassel-free.
            			</p>
						<br />
						<div className="col s6">
							<Link
								to="/registertype"
								style={{
									width: "140px",
									borderRadius: "3px",
									letterSpacing: "1.5px"
								}}
								className="btn btn-large waves-effect waves-light hoverable accent-3">
								Register
              				</Link>
						</div>
						<div className="col s6">
							<Link
								to="/login"
								style={{
									width: "140px",
									borderRadius: "3px",
									letterSpacing: "1.5px"
								}}
								className="btn btn-large btn-flat waves-effect white black-text">
								Log In
              				</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps)(Landing);
