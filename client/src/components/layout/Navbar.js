import React, { Component } from "react";
import { Link } from "react-router-dom";

import tipngoLogo from "./TipNGoLogoMk5.png";

class Navbar extends Component {
	render() {
		return (
			<div className="navbar-fixed">
				<nav className="z-index: 5" style={{ height: "115px"}}>
					<div className="nav-wrapper" style={{ backgroundColor: "#01ae9b" }}>
						<Link
							to="/"
							style={{
								fontFamily: "monospace"
							}}
							className="col s5 brand-logo center black-text">
							<img src={tipngoLogo} style={{width: 176.2, height: 110}} alt="Tip'N'Go" />
            			</Link>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
