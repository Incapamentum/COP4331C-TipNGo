import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import TopLogin from "./components/topLogin-component";
import TipperLogin from "./components/tipperLogin-component";
import TippeeLogin from "./components/tippeeLogin-component";

import logo from "./logo.png";

class App extends Component {
    render () {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="https://tip-n-go.herokuapp.com/" target="_blank">
                            <img src={logo} width="80" height="50" alt="Tip'N'Go" />
                        </a>
                        <Link to="/" className="navbar-brand">Tip'N'Go</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/tipperLogin" className="nav-link">Login as Tipper</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/tippeeLogin" className="nav-link">Login as Tippee</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br/>
                    <Route path="/" exact component={TopLogin} />
                    <Route path="/tipperLogin" component={TipperLogin} />
                    <Route path="/tippeeLogin" component={TippeeLogin} />
                </div>
            </Router>
        );
    }
}

export default App;