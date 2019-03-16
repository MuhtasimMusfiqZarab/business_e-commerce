import React, { Component } from "react";
import { Container, Box, Heading, Card, Image, Text } from "gestalt";
import { Link } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
const apiURL = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiURL);

class Brands extends Component {
  state = {
    brands: []
  };

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
    this.setState({ brands: response.data.brands });
  }

  render() {
    const { brands } = this.state;
    return (
      <Container>
        {/* Brands section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Featured Brands
          </Heading>
        </Box>
        {/* Brands */}
        <Box display="flex" justifyContent="around">
          {brands.map(brand => (
            <Box margin={2} width={200} key={brand._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiURL}${brand.image[0].url}`}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignContent="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`${brand._id}`}>See Product</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default Brands;
