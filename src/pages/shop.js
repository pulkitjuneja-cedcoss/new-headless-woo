import React from 'react';
import "../css/index.css"
import ProductCard from '../templates/ProductCard';
import { graphql, useStaticQuery } from 'gatsby';
import { useState, useEffect } from 'react'; 
// import Products from '../graphql/Products.js';

import { useQuery, gql,useLazyQuery } from "@apollo/client";


const Shop = () => {

  //const [pageInfo, setPageInfo] = useState({ endCursor: "", previousPage: "", startCursor: "", nextPage: ""});
  const [ startCursor, setStartCursor ] = useState("");
  const [ endCursor, setEndCursor ] = useState("");
  const [page, setPage] = useState(1);
  const [catFilter, setCatFilter] = useState("");
  const [ catEvent, setCatEvent ] = useState("");
  // const [ filterData, setFilterData ] = useState([]);
 // const [ Skip, setSkip ] = useState(false);
  const [products, setProducts] = useState([]);
  const [ productsInfo, setProductsInfo ] = useState({})
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [ LoadMoreCursor, setLoadMoreCursor ] = useState("");
  const [ first, setFirst ] = useState(2);
  const [ last, setLast ] = useState(null);

console.log(startCursor,endCursor)
  // RequiredProducts();
  const GetProducts = gql`
  query MyQuery ( $after: String, $before: String, $first: Int, $catFilter: String, $last: Int ){
    swapi {
        products ( where: {category: $catFilter }, after: $after,before: $before, first: $first, last: $last ){
          edges   {
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

  //console.log("pageInfo",pageInfo.startCursor);
  // console.log("skip",Skip);
  const {error,loading,data,fetchMore}  = useQuery(GetProducts,{variables:{
    after: startCursor, before: endCursor, first: first, last: last, catFilter: catFilter }});

    //after: after, before: before, first: first, last: last, catFilter: catFilter }});


  console.log("rerendered");

  const handleInputFilter = event => {
    console.log("handle");
    setCatFilter(event.target.value);
  }

  const resetFilter = event => {
    console.log("reset");
    setCatFilter("");
    setCatEvent("");
  }

  // const setCursors = (cursor) => {
  //   if( cursor == "endCursor"){
  //     setEndCursor( data.swapi.products.pageInfo.startCursor );
  //   }
  // }

  return(
    <div> 
      <h1>Welcome to our Shop</h1>
      <input type="text" placeholder="Enter Product Category" value={catEvent} onKeyPress={
        (e) => {
          console.log("ok",e.nativeEvent.key);
          const fil = catEvent + e.nativeEvent.key;
          setCatEvent(fil);
          if (e.charCode == 13) {
           //handleInputFilter(e);
           setCatFilter(e.target.value);
           console.log(e.target.value);
           fetchMore({
            variables: {
              before: "",
              first: 1,
              after: "",
              catFilter: e.target.value
            },
          });
          }
          
        }
      }
      />
      <button onClick={()=>{resetFilter()}}>Reset Filter</button>
      {console.log(data)}

      <button onClick={  () => {
      // setLoadMoreCursor( data.swapi.products.pageInfo.startCursor);
         const loadcursor = data.swapi.products.pageInfo.endCursor;
          //console.log(pageInfo.endCursor);
           fetchMore({
            variables: {
              after: loadcursor,
              first: 2,
              before: "",
            },
            updateQuery: (prevResult,{fetchMoreResult}) =>{
              console.log(prevResult);
              console.log(fetchMoreResult);
              fetchMoreResult.swapi.products.edges = [
                ...prevResult.swapi.products.edges,
                ...fetchMoreResult.swapi.products.edges
              ];
              console.log(fetchMoreResult);
              // return fetchMoreResult;
            }
          });
     } }>Load More</button>
      
     <button onClick={ () => {
       console.log("prevoius page data");
         
        setFirst(null);
        setLast(2);
        //setCursors("endCursor");
        // setPageInfo({...pageInfo, startCursor: "" });
        setEndCursor( data.swapi.products.pageInfo.startCursor );
        setStartCursor("");
         const cursor = data.swapi.products.pageInfo.startCursor;
          console.log("endcursor",endCursor);
          console.log("startCursor",startCursor);
          fetchMore({
            variables: {
              before: cursor,
              last: 2,
              after: null,
              first: null
            },
          });
          

     } }>PreviousPage</button>



     <button onClick={  () => {
          // setIsLoadingMore(true);
          console.log(data.swapi.products.pageInfo.endCursor);
          
           setEndCursor(null);
           setFirst(2);
           setLast(null);
           setStartCursor(data.swapi.products.pageInfo.endCursor);
        
         const cursor = data.swapi.products.pageInfo.endCursor;
          console.log("start",startCursor);
           fetchMore({
            variables: {
              after: cursor,
              first: 2,
              before: null,
              last: null

            },
          });
        
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




