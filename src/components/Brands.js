import React, { Component } from "react";
import { Container, Box, Heading } from "gestalt";
import Strapi from "strapi-sdk-javascript/build/main";
const apiURL = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiURL);

class Brands extends Component {
  state = {};

  async componentDidMount() {
    const response = await strapi.request("POST", "/graphql", {
      data: {
        query: `query{
                    brands{
                            _id
                            name
                            description
                            createdAt
                            image{
                                name
                            url
                        }
  }
}`
      }
    });
    console.log(response);
  }
  render() {
    return (
      <Container>
        {/* Brands section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Pantssss
          </Heading>
        </Box>
      </Container>
    );
  }
}

export default Brands;
