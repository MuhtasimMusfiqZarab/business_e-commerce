import React, { Component } from "react";
import { Container, Box, Button, Heading, Text, TextField } from "gestalt";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    phone: "",
    password: "",
    t_size: "",
    waistSize: ""
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.isFormEmpty(this.state)) {
      console.log("Submitted");
    }
  };

  // Basic Validation
  isFormEmpty = ({ username, email, phone, password }) => {
    return !username || !email || !password || !phone;
  };

  render() {
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#ebe2da"
            }
          }}
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
        >
          {/* Sign Up Form */}
          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            {/* Sign  up form heading */}

            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Lets get started</Heading>
              <Text italic color="orchid">
                SignUp to order Products
              </Text>
            </Box>
            {/* Username Input */}
            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
            {/* Email address Input */}
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            {/* Phone Input */}
            <TextField
              id="phone"
              type="text"
              name="phone"
              placeholder="Contact Number"
              onChange={this.handleChange}
            />
            {/* Password Input */}
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            {/* T-shirt size Input */}
            <TextField
              id="t_size"
              type="text"
              name="t_size"
              placeholder="T-shirt Size"
              onChange={this.handleChange}
            />
            {/* Waist size Input */}
            <TextField
              id="waistSize"
              type="text"
              name="waistSize"
              placeholder="Waist size"
              onChange={this.handleChange}
            />
            <Button inline color="blue" text="Submit" type="submit" />
          </form>
        </Box>
      </Container>
    );
  }
}

export default SignUp;
