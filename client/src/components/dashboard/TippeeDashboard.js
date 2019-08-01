import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class TippeeDashboard extends Component {


	constructor() {
		super();
		//this.sendTips = this.sendTips.bind(this);
		this.state = {
			balance: 0,
			jsonUserID: "",
			errors: {}
		};
	}
	// state = {
	// 	balance: 0,
	// 	jsonUserID: {}
	// }

	componentDidMount() {
		// If logged in as tipper and not tippee, redirect
		if (this.props.auth.isAuthenticated) {
			const { user } = this.props.auth;
			if (user.usertype !== "tippee")
				this.props.logoutUser();
			// Once confirmed as a tippee, change the jsonUserID to properly have the data

			// this.state.jsonUserID = {"id": user.id}

			// Performing a POST request to obtain balance information and setting its state
			axios
				.post("/api/accounts/findtippee", {"id": user.id})
				.then(res =>
					{
						this.setState({balance: res.data.balanceUSD/100})
					})
				.catch(err =>
					{
						console.log(err)
					})
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
	}

	render() {
		const { user } = this.props.auth;

		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="landing-copy col s12 center-align">
						<h4>
							<b>Welcome</b> {user.name.split(" ")[0]}
							<p className="flow-text grey-text text-darken-1">
								<br />
								<b>Your Balance:</b> ${this.state.balance}
                                <br />
                                <br />
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
							className="btn btn-large waves-effect waves-light hoverable accent-3">
							Logout
            			</button>
					</div>
					<div className="landing-copy col s12 center-align">
						<button
							style={{
								width: "300px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem",
								visibility: "hidden"
							}}
							onClick={this.onTransactionClick}
							className="btn btn-large waves-effect waves-light hoverable accent-3">
							View Transaction History
						</button>
					</div>
				</div>
			</div>
		);
	}
}

TippeeDashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(TippeeDashboard);
