import React from 'react';
import { useQuery, gql } from "@apollo/client";


const Products = (props) => {

  const GetProducts = gql`
  query MyQuery ( $start: String){
      swapi {
        products ( after: $start, first: 2 ){
          edges  {
            node {
              name
              id
              galleryImages {
                nodes {
                  link
                  id
                  uri
                  title
                  slug
                }
              }
              image {
                link
                id
                uri
                title(format: RENDERED)
                slug
              }
              ... on SWAPI_SimpleProduct {
                id
                name
                price
                salePrice
                regularPrice
              }
              ... on SWAPI_VariableProduct {
                id
                name
                salePrice
                regularPrice
                price
              }
              reviews {
                nodes {
                  content(format: RAW)
                }
            }
          }
          pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
          }
        }
      }
    }

  `;

  //{variables: {start:pageInfo.endCursor}}

  const {error,loading,data} = useQuery(GetProducts);

  if( data && data.swapi && data.swapi.products ){

    return data;
  }

}

export default Products;
