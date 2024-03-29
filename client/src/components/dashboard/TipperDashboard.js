import axios from "axios";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, sendTips } from "../../actions/authActions";

class TipperDashboard extends Component {
	constructor() {
		super();
		//this.sendTips = this.sendTips.bind(this);
		this.state = {
			tippee: "",
			amount: "",
			errors: {}
		};
	}

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

	sendTipsOnClick = e => {
		e.preventDefault();
		axios
			.post("api/accounts/findalltippees")
			.then(res => {
				console.log(res);
				var options = ' ';
				for(var i = 0; i < res.data.results.length; i++)
					options += '<option value="'+res.data.results[i].userName+'" />';

				document.getElementById('tippeeList').innerHTML = options;
				document.getElementById('searchTippee').style.visibility = "visible";
				document.getElementById('searchTippee').style.display = "block";
				document.getElementById('tippeeList').style.visibility = "visible";
				document.getElementById('tippeeList').style.display = "block";
				document.getElementById('sendButton').style.visibility = "hidden";
				//document.getElementById('tippeeList').style.display = "block";
			})
	}

	viewStoryOnClick = e => {
		e.preventDefault();
		const {user} = this.props.auth;
		axios
			.post("api/accounts/transactionhistory", {"id":user.id})
			.then(res => {
				console.log(res);
			})
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		axios
			.post("api/accounts/searchbyusername", {"username":this.state.tippee})
			.then(res => {
				console.log(res);
				const {user} = this.props.auth;
				var x = this.state.amount * 100;
				const pack = {
					tippeeid: res.data._id,
					amount: x,
					id: user.id
				};

				this.props.sendTips(pack);
				alert('You sent $' + this.state.amount + ' to ' + this.state.tippee);
				this.setState({
					tippee: "",
					amount: "",
					errors: {}
				});
			})

	};

	render() {
		const { user } = this.props.auth;

		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="landing-copy col s12 center-align">
						<h4>
							<b>Welcome</b> {user.name.split(" ")[0]}
						</h4>
						<button
							id= "sendButton"
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							onClick={this.sendTipsOnClick}
							className="btn btn-large waves-effect waves-light hoverable accent-3">
							Send Tips
									</button>
						<form
							id= "searchTippee"
							style={{
								visibility: "hidden",
								display: "none"
							}}
							noValidate onSubmit={this.onSubmit}>
							<input
								list="tippeeList"
								onChange={this.onChange}
								value={this.state.tippee}
								placeholder="Search for a Tippee"
								//error={errors.tippee}
								id="tippee"
								>
								</input>
							<datalist
								id= "tippeeList"
								style={{
									visibility: "hidden",
									display: "none"
								}}>
								</datalist>
							<input
							type="number"
							onChange={this.onChange}
							value={this.state.amount}
							placeholder="Tip amount"
							//error={errors.amount}
							id="amount"
							>
								</input>
							<input
							type="submit"
							value="Send Tip"
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							className="btn btn-large waves-effect waves-light hoverable accent-3"
							>
								</input>


							</form>
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
							onClick={this.viewStoryOnClick}
							className="btn btn-large waves-effect waves-light hoverable accent-3">
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
	{ logoutUser, sendTips }
)(TipperDashboard);
