import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SignIn from "./SignIn";
import Checkout from "./Checkout";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import Brands from "./Brands";
import Products from "./Products";
// import history from "../history";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Brands} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/:brandId" component={Products} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
