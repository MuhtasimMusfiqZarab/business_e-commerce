import React, { Component } from "react";
import { Link } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
// prettier-ignore
import {Box,Heading,Text,Image,Card,Button,Mask} from "gestalt";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Products extends Component {
  state = {
    products: [],
    brand: "",
    cartItems: []
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
    const { brand, products, cartItems } = this.state;
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: "wrap-reverse"
          }
        }}
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
        {/* user cart */}
        <Box alignSelf="end" marginTop={2} marginLeft={8}>
          <Mask shape="rounded" wash>
            <Box
              display="flex"
              direction="column"
              alignItems="center"
              padding={2}
            >
              {/* User card Heading */}
              <Heading align="center" size="md">
                Your Cart
              </Heading>
              <Text color="gray" italic>
                {cartItems.length} items selected
              </Text>

              {/* Cart Items(will add) */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Box margin={2}>
                  {cartItems.length === 0 && (
                    <Text color="red">Please Select Some Items</Text>
                  )}
                </Box>
                <Text size="lg"> Total Taka 3.99/-</Text>
                <Text>
                  <Link to="/checkout">checkout</Link>
                </Text>
              </Box>
            </Box>
          </Mask>
        </Box>
      </Box>
    );
  }
}

export default Products;
