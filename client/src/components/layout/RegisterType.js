import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class RegisterType extends Component {
    render() {
        return (
            <div className="container">
                <Link to="/" className="btn-flat waves-effect">
					<i className="material-icons left">keyboard_backspace</i> Back to Welcome
            	</Link>
				<h4 style={{ paddingTop: "25px" }}>
				    Create an account
            	</h4>
				<p className="grey-text text-darken-1">
					Already have an account? <Link to="/login" style={{color: "#01ae9b"}}>Log in</Link>
				</p>
                <div className="row column-gap">
                    <div className="col s12 l5">
                        <h5>Will you be giving tips?</h5>
                        <p className="flow-text grey-text text-darken-1">
                            Search for workers that you think need a tip. Find Tippees by location, username, or QR code. Connect a debit card to make leaving a tip even easier.
                        </p>
                        <Link
							to="/registertipper"
							style={{
								width: "200px",
								borderRadius: "3px",
								letterSpacing: "1.5px"
							}}
							className="btn btn-large waves-effect waves-light hoverable accent-3">
							Become a Tipper
              			</Link>
                    </div>
					<div className="col s12 l5 right">
                        <h5>...Or receiving tips?</h5>
                        <p className="flow-text grey-text text-darken-1">
                            Create a profile and set your location of work. Tippers can search for you in a variety of ways. Connect your bank account to transfer collected tips.
                        </p>
                        <Link
							to="/registertippee"
							style={{
								width: "200px",
								borderRadius: "3px",
								letterSpacing: "1.5px"
							}}
							className="btn btn-large waves-effect waves-light hoverable accent-3">
							Become a Tippee
              			</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(RegisterType));