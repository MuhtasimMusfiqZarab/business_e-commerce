import React from "react";
import { Box, Text, Heading, Image } from "gestalt";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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

export default Navbar;
