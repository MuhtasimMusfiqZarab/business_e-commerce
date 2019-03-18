import React, { Component } from "react";
import { Link } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
// prettier-ignore
import {Box,Heading,Text,Image,Card,Button,Mask, IconButton} from "gestalt";
import { calculatePrice, setCart, getCart } from "../utils";
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
        brand: response.data.brand.name,
        cartItems: getCart()
      });
      //   console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  addToCart = product => {
    const alreadyInCart = this.state.cartItems.findIndex(
      item => item._id === product._id
    );
    if (alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...product,
        quantity: 1
      });
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
    } else {
      const updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
    }
  };

  deleteItemFromCart = itemToDeleteId => {
    const filteredItems = this.state.cartItems.filter(
      item => item._id !== itemToDeleteId
    );
    this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
  };

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
                        <Button
                          onClick={() => this.addToCart(product)}
                          color="blue"
                          text="Add to Cart"
                        />
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
              <Heading align="center" size="sm">
                Your Cart
              </Heading>
              <Text color="gray" italic>
                {cartItems.length} items selected
              </Text>

              {/* Cart Items(will add) */}

              {cartItems.map(item => (
                <Box key={item._id} display="flex" alignItems="center">
                  <Text>
                    {item.name} -> {item.quantity} -{" "}
                    {(item.quantity * item.price).toFixed(2)}
                  </Text>
                  <IconButton
                    accessibilityLabel="Delete Item"
                    icon="cancel"
                    size="sm"
                    iconColor="red"
                    onClick={() => this.deleteItemFromCart(item._id)}
                  />
                </Box>
              ))}

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
                <Text size="lg"> Total Taka {calculatePrice(cartItems)}/-</Text>
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
