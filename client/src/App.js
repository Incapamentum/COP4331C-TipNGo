import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import RegisterType from "./components/layout/RegisterType";
import RegisterTippee from "./components/auth/RegisterTippee";
import SetupStripe from "./components/auth/SetupStripe";
import SetupBank from "./components/auth/SetupBank";
import RegisterTipper from "./components/auth/RegisterTipper";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import TippeeDashboard from "./components/dashboard/TippeeDashboard";
import TipperDashboard from "./components/dashboard/TipperDashboard";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = "./login";
	}
}
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<Route exact path="/registertype" component={RegisterType} />
						<Route exact path="/registertippee" component={RegisterTippee} />
						<Route exact path="/setupstripe" component={SetupStripe} />
						<Route exact path="/setupbank" component={SetupBank} />
						<Route exact path="/registertipper" component={RegisterTipper} />
						<Route exact path="/login" component={Login} />
						<Switch>
							<PrivateRoute exact path="/tippeedashboard" component={TippeeDashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/tipperdashboard" component={TipperDashboard} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}
export default App;
