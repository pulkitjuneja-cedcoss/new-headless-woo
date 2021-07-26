import React from 'react';
import "../css/index.css"
import ProductCard from '../templates/ProductCard';
import { graphql, useStaticQuery } from 'gatsby';
import { useState, useEffect } from 'react'; 
// import Products from '../graphql/Products.js';

import { useQuery, gql,useLazyQuery } from "@apollo/client";


const Shop = () => {

  const [pageInfo, setPageInfo] = useState({ endCursor: "", previousPage: "", startCursor: "", nextPage: ""});
  const [page, setPage] = useState(1);
  const [productFilter, setFilter] = useState("");
  // const [ filterData, setFilterData ] = useState([]);
  const [ Skip, setSkip ] = useState(false);
  const [products, setProducts] = useState([]);
  const [ productsInfo, setProductsInfo ] = useState({})
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  // RequiredProducts();
  const GetProducts = gql`
  query MyQuery ( $after: String){
      swapi {
        products ( after: $after, first: 2 ){
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

  console.log("pageInfo",pageInfo.startCursor);
  console.log("skip",Skip);
  const {error,loading,data,fetchMore}  = useQuery(GetProducts,{variables:{after:pageInfo.endCursor},skip:false});

  // useEffect( ()=> {
  //   if( data && data.swapi && data.swapi.products ){

  //     console.log("cursor")
  //     setPageInfo({...pageInfo, startCursor: data.swapi.products.pageInfo.endCursor });
  //   }
  // },[data]) 
  

  console.log("rerendered");

  // ,{variables: {start:pageInfo.endCursor}}

    const handleInputFilter = event => {
      console.log("handle");
      setFilter(event.target.value);
    }


  return(
    <div> 
      <h1>Welcome to our Shop</h1>
      <input type="text" placeholder="enter post name" onKeyPress={
        (e) => {
          console.log(e);
          if (e.charCode == 13) {
            handleInputFilter(e);
          }
        }
      }
      />
      {console.log(data)}
      
     <button >PreviousPage</button>
     <button onClick={ () => {
          setIsLoadingMore(true);
          setSkip(true);
          console.log("hhy");
         // setPageInfo(data.swapi.products.pageInfo.endCursor);
         setPageInfo({...pageInfo, startCursor: data.swapi.products.pageInfo.endCursor });
          console.log(data.swapi.products.pageInfo.endCursor);
          fetchMore({
            variables: {
              after: data.swapi.products.pageInfo.endCursor,
            },
          });
          setIsLoadingMore(false);
        }}>NextPage</button>

    </div>
  )

}


export default Shop;

// // $endCursor: String, $startCursor: String
// // after: $startCursor

// //@include(if: $NextPage)


// // export const query = graphql`
// // query ( $productFilter: String, $startCursor: String) {
// //   swapi {
// //     products ( where: {category: $productFilter }, after: $startCursor, first: 2 ) {
// //       nodes {
// //         name
// //         id
// //         galleryImages {
// //         nodes {
// //           link
// //           id
// //           uri
// //           title
// //           slug
// //           }
// //         }
// //         image {
// //           link
// //           id
// //           uri
// //           title(format: RENDERED)
// //           slug
// //         }
// //       }
// //       pageInfo {
// //         endCursor
// //         hasNextPage
// //         hasPreviousPage
// //         startCursor
// //       }
// //     }
// //   }
// // }

// // `;




