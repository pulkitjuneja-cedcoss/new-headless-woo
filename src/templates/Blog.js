import React from 'react';
import "../css/index.css"
// import PostTemplate from './PostTemplate';
import { graphql } from 'gatsby';
import {useState, useEffect} from 'react';


const Blog = ({data,pageContext}) => {

  const [ filter, setFilter ] = useState("");
  const [ filterData, setFilterData ] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(1);
  //const [ nextPage, setNextPage ] = useState(0);

  const hasPreviousPage = () => {
    let p = page > 1 ? ( page - 1 ) : 1 ; 
    setPage(p);
  }

  const hasNextPage = () => {
    let q = page + 1; 
    setPage(q);
  }

  
  const skip = pageContext.skip;
  const limit = pageContext.limit;
  const length = skip + limit;

  // const allPosts = data.swapi.posts.nodes;
  //console.log(data.swapi.posts.nodes);
  //setPosts(allPosts);

  const allPosts = data.swapi.posts.nodes.slice(skip,length);
  //console.log(allPosts);

    
  useEffect( ()=>{
    console.log("called for setting filter");
    const filteredData = [];

    allPosts.map( post => {    
      const { title } = post;
      //const match = (-1);
      if( filter !== "" ){
        if( title.search(filter) >= 0 ){
          filteredData.push(post);
        }
      }else{
        filteredData.push(post);
      }  
    }
  )

 // console.log(filteredData);
  setFilterData( filteredData );
  
  }, [filter] );


  useEffect ( () => { setPosts(filterData); }, [filterData]);

  const handleInputFilter = event => { setFilter(event.target.value); }

  return (
    <div > i am from blog
      <input  type="text" placeholder="enter post name" onKeyPress={
        (e) => { console.log(e);
        if(e.charCode == 13 ){ 
          console.log("ok");
          handleInputFilter(e); 
        } 
       } 
      }
       />
      {
         console.log(page)
      //   posts.map( node => {
      //     const title = node.title || node.slug
      //     return (
      //       <PostTemplate 
      //       title={title} 
      //       path = {node.link}
      //       />
      //     )
      // })
      }
    
      <button onClick={hasPreviousPage}>PreviousPage</button>
      <button onClick={hasNextPage}>NextPage</button>
    </div>
  )

};

export default Blog;

export const query = graphql`
query ( $filter: String ){
  swapi {
    posts (where: {name: $filter } ){
      nodes {
        content
        id
        link
        slug
        title
        uri
      }
    }
  }
}
`;
