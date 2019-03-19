import React, { Component } from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { getToken, clearToken, clearCart } from "../utils";
import { NavLink, withRouter } from "react-router-dom";

class NavBar extends Component {
  state = {};

  handleSignOut = () => {
    //clear token
    clearToken();

    //clear cart
    clearCart();
    //redirect home
    this.props.history.push("/"); //we could not use this as we are not in switch component coz it wont be in props object
    // but we userd withRouter to resolve this issue
  };

  render() {
    return getToken() !== null ? (
      <AuthNav handleSignOut={this.handleSignOut} /> // passed as handleSignOut prop so that signout button can use it
    ) : (
      <UnAuthNav />
    );
  }
}

export default withRouter(NavBar);

const AuthNav = ({ handleSignOut }) => {
  // distructuring prop handleSignOut here so that we dont need to use props.handleSignOut
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="around"
      height={70}
      color="midnight"
      padding={1}
      shape="roundedBottom"
    >
      {/* Checkout link */}
      <NavLink activeClassName="active" to="/checkout">
        <Text size="xl" color="white">
          Checkout
        </Text>
      </NavLink>

      {/* title & logo */}
      <NavLink activeClassName="active" exact to="/">
        <Box display="flex" alignItems="center">
          <Box height={50} width={50}>
            <Image
              alt="logo"
              naturalHeight={1}
              naturalWidth={1}
              src="./pant.png"
            />
          </Box>
          <Heading size="xs" color="orange">
            Garnish
          </Heading>
        </Box>
      </NavLink>

      {/* signout link */}

      <Button
        onClick={handleSignOut}
        color="transparent"
        text="Sign Out"
        inline
        size="md"
      />
    </Box>
  );
};

// export default AuthNav ;

const UnAuthNav = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="around"
      height={70}
      color="midnight"
      padding={1}
      shape="roundedBottom"
    >
      {/* signin link */}
      <NavLink activeClassName="active" to="/signin">
        <Text size="xl" color="white">
          Sign In
        </Text>
      </NavLink>

      {/* title & logo */}
      <NavLink activeClassName="active" exact to="/">
        <Box display="flex" alignItems="center">
          <Box height={50} width={50}>
            <Image
              alt="logo"
              naturalHeight={1}
              naturalWidth={1}
              src="./pant.png"
            />
          </Box>
          <Heading size="xs" color="orange">
            Garnish
          </Heading>
        </Box>
      </NavLink>

      {/* signup link */}
      <NavLink activeClassName="active" to="/signup">
        <Text size="xl" color="white">
          Sign Up
        </Text>
      </NavLink>
    </Box>
  );
};

// export default UnAuthNav;
