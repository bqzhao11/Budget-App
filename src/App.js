import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


import Dashboard from "./components/dashboard_comp";
import Treasurer from "./components/treasurer_comp";
import Login from "./components/login_comp";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/treasurer" component={Treasurer} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}
export default App;


