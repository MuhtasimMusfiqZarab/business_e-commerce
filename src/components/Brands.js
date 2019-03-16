import React, { Component } from "react";
import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon
} from "gestalt";
import { Link } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
const apiURL = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiURL);

class Brands extends Component {
  state = {
    brands: [],
    searchTerm: ""
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

  // Take search Input
  handleChange = ({ value }) => {
    console.log(value);
    this.setState({ searchTerm: value });
  };

  //Filter according to brands
  filteredBrands(search) {
    this.state.brands.filter(brand => {
      return brand.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  render() {
    const { brands, searchTerm } = this.state;
    return (
      <Container>
        {/* Brand Search Field */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brand Search Field"
            onChange={this.handleChange}
            placeholder="Search Brands"
          />
          <Box margin={2}>
            <Icon
              icon="heart"
              color={searchTerm ? "red" : "gray"}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>

        {/* Brands section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Featured Brands
          </Heading>
        </Box>
        {/* Brands */}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6c8ec"
            }
          }}
          shape="rounded"
          wrap
          display="flex"
          justifyContent="around"
        >
          {this.filteredBrands(this.state.searchTerm).map(brand => (
            <Box paddingY={2} margin={2} width={200} key={brand._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
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
