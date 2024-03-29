import React, { Component } from "react";
import { Container, Box, Button, Heading, Text, TextField } from "gestalt";
import { setToken } from "../utils";
import ToastMessage from "./ToastMessage";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    phone: "",
    password: "",
    t_size: "",
    waistSize: "",
    toast: false,
    toastMessage: "",
    loading: false
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, email, password } = this.state;

    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all the fields");
      return;
    }
    // Sign up a user
    try {
      //set loading -true
      this.setState({ loading: true });

      //make request to register user with strapi
      const response = await strapi.register(username, email, password);
      //Set loading flase
      this.setState({ loading: false });

      //put token (to manage user session ) in local storage
      setToken(response.jwt);
      console.log(response);

      //redirect user to homepage
      this.redirectUser("/");
    } catch (err) {
      //set loading - flase
      this.setState({ loading: false });
      //show the error with toast message
      this.showToast(err.message);
    }
  };

  // redirection user
  redirectUser = path => {
    this.props.history.push(path);
  };

  // Basic Validation
  isFormEmpty = ({ username, email, phone, password }) => {
    return !username || !email || !password || !phone;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 5000);
  };

  render() {
    const { toastMessage, toast, loading } = this.state;
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
            <Button
              inline
              disabled={loading}
              color="blue"
              text="Submit"
              type="submit"
            />
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}

export default SignUp;
