import React, { Component } from "react";
import Strapi from "strapi-sdk-javascript/build/main";
// prettier-ignore
import {Box,Heading,Text,Image,Card,Button} from "gestalt";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Products extends Component {
  state = {
    products: [],
    brand: ""
  };

  async componentDidMount() {
    // console.log(this.props.match.params);
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
  brand(id:"${this.props.match.params.brandId}"){
    _id
    name
    products{
      _id
      name
      description
      image{
        url
      }
      price
      
    }
  }
}`
        }
      });
      this.setState({
        products: response.data.brand.products,
        brand: response.data.brand.name
      });
      //   console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const { brand, products } = this.state;
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
      >
        {/* Products section */}
        <Box display="flex" direction="column" alignItems="center">
          {/* Product Heading */}
          <Box margin={2}>
            <Heading color="orchid">{brand}</Heading>
          </Box>
          {/* Products */}
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#bdcdd9"
              }
            }}
            wrap
            shape="rounded"
            display="flex"
            justifyContent="center"
            padding={4}
          >
            {products.map(product => (
              <Box paddingY={4} margin={2} width={210} key={product._id}>
                <Card
                  image={
                    <Box height={250} width={200}>
                      <Image
                        fit="cover"
                        alt="Brand"
                        naturalHeight={1}
                        naturalWidth={1}
                        src={`${apiUrl}${product.image[0].url}`}
                      />
                    </Box>
                  }
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Box marginBottom={2}>
                      <Text bold size="xl">
                        {product.name}
                      </Text>
                    </Box>
                    <Text>{product.description}</Text>
                    <Text color="orchid">Taka {product.price}/-</Text>

                    <Box marginTop={2}>
                      <Text bold size="xl">
                        <Button color="blue" text="Add to Cart" />
                      </Text>
                    </Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Products;
