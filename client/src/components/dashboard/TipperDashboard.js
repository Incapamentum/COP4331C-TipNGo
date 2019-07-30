import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { obtainTransHistory } from "../../actions/transHistory";

class TipperDashboard extends Component {
	componentDidMount() {
		// If logged in as tippee and not tipper, logout and redirect
		if (this.props.auth.isAuthenticated) {
			const { user } = this.props.auth;
			if (user.usertype !== "tipper")
				this.props.logoutUser();
		}
	}

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	onTransactionClick = e =>
	{
		e.preventDefault();
		this.props.obtainTransHistory();
	};

	render() {
		const { user } = this.props.auth;

		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="landing-copy col s12 center-align">
						<h4>
							<b>Welcome</b> {user.name.split(" ")[0]}
							<p className="flow-text grey-text text-darken-1">
								You are logged into{" "}
								<span style={{ fontFamily: "monospace" }}>Tip'N'Go</span>
								<br />
								<b>This is the Tipper Dashboard</b>
								<br />
                                Your userid is {user.id}
                                <br />
                                You are a {user.usertype}
							</p>
						</h4>
						<button
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							onClick={this.onLogoutClick}
							className="btn btn-large waves-effect waves-light hoverable blue accent-3">
							Logout
            			</button>
					</div>
					<div className="landing-copy col s12 center-align">
						<button
							style={{
								width: "300px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							onClick={this.onTransactionClick}
							className="btn btn-large waves-effect waves-light hoverable blue accent-3">
							View Transaction History
						</button>
					</div>
				</div>
			</div>
		);
	}
}

TipperDashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser, obtainTransHistory }
	// { obtainTransHistory }
)(TipperDashboard);
