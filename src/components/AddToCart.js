import * as React from "react"
import "../css/index.css"
// import { Link } from "gatsby"
import { Button } from '@cedcommerce/ounce-ui'
// import { useState, useEffect } from 'react'; 
import { gql } from "@apollo/client";

const AddToCart = (props) => {
    const { product } = props;
    // console.log(product);
    // console.log(props.product);

    const ADD_TO_CART = gql`
    mutation ADD_TO_CART($input: ID!) {
      addToCart(input: $input) {
        cartItem {
          key
          product {
            node {
              id
              productId: databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                id
                sourceUrl
                altText
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  altText
                }
              }
            }
          }
          variation {
            node {
              id
              variationId: databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                altText
              }
            }
            attributes {
              id
              attributeId
              name
              value
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }
    }
    `;

    const GET_CART = gql`
query GET_CART {
  cart {
    contents {
      nodes {
        key
        product {
          node {
            id
            productId: databaseId
            name
            description
            type
            onSale
            slug
            averageRating
            reviewCount
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
            galleryImages {
              nodes {
                id
                sourceUrl
                srcSet
                altText
                title
              }
            }
          }
        }
        variation {
          node {
            id
            variationId: databaseId
            name
            description
            type
            onSale
            price
            regularPrice
            salePrice
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
          }
          attributes {
            id
            name
            value
          }
        }
        quantity
        total
        subtotal
        subtotalTax
      }
    }
    appliedCoupons {
      code
      discountAmount
      discountTax
    }
    subtotal
    subtotalTax
    shippingTax
    shippingTotal
    total
    totalTax
    feeTax
    feeTotal
    discountTax
    discountTotal
  }
}
    `;

    // const productQryInput = {
    //    // clientMutationId: v4(), // Generate a unique id.
    //     productId: product.productId,
    // };

    // Get Cart Data.
   // const {get_cart_data, refetch} = useQuery(GET_CART
    //   , {
    //   //notifyOnNetworkStatusChange: true,
    //   onCompleted: () => {

    //       // Update cart in the localStorage.
    //       // const updatedCart = getFormattedCart(data);
    //       // localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

    //       // // Update cart data in React Context.
    //       // setCart(updatedCart);
    //   }
    // }
   // );

     // Add to Cart Mutation.
    //  const [ addToCart, { add_to_cart_data,loading,error} ] = useMutation(ADD_TO_CART, {
    //     variables: {
    //         input: "cHJvZHVjdDo2MTU=",
    //     }
        // onCompleted: () => {
        //     // On Success:
        //     // 1. Make the GET_CART query to update the cart with new values in React context.
        //     refetch();

        //     // 2. Show View Cart Button
        //    // setShowViewCart(true)
        // },
        // onError: (error) => {
        //     if (error) {
        //         setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
        //     }
        // }
    //   }
    // );

    const  addProductToCart = (product) => {
      console.log("addTOProductCart",product.node);
      let addToCartProducts = JSON.parse( localStorage.getItem('cedcommerce_cart') );
      console.log(addToCartProducts);
      if( addToCartProducts == null || addToCartProducts == undefined ){
        addToCartProducts = [];
      }
      let product_array = [];
      let image_url_exist = false;
      console.log(product.node.image);
      if( product.node.image !== null && product.node.image !== undefined ){
        product_array.push({'sourceUrl':product.node.image.sourceUrl})
      }
      else{
        product_array.push({'sourceUrl':""})
      }
      if( product.node.price !== null && product.node.price !== undefined ){
        product_array.push({'price':product.node.price})
      }
      else{
        product_array.push({'price':""})
      }
      if( product.node.name !== null && product.node.name !== undefined ){
        product_array.push({'name':product.node.name})
      }
      else{
        product_array.push({'name':""})
      }
      

      product_array.push({'quantity': 1 })
      addToCartProducts.push(product_array);
      localStorage.setItem('cedcommerce_cart', JSON.stringify(addToCartProducts));
    }

    const handleAddToCartClick =  (product) => {
        addProductToCart(product);
    };

    
    return(
        <> <Button type="Outlined" onClick={
          () => { console.log("add to cart ");
              handleAddToCartClick(product)}
        }>Add to cart</Button></>
    )

}

export default AddToCart;