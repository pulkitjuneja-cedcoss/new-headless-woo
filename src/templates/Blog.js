import React from 'react';
import "../css/index.css"
// import Pager from '../components/pager'
import PostTemplate from './PostTemplate';
import { graphql,useStaticQuery } from 'gatsby';
import {useState, useEffect} from 'react';


const Blog = ({data,pageContext}) => {

  const [ filter, setFilter ] = useState("");
  const [ filterData, setFilterData ] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(1);
  //const [ nextPage, setNextPage ] = useState(0);

  const hasPreviousPage = () => {
    console.log("ok");
    let p = page > 1 ? ( page - 1 ) : 1 ; 
    setPage(p);
  }

  const hasNextPage = () => {
    console.log("done");
    let q = page + 1; 
    setPage(q);
  }

  console.log(data);
  console.log(pageContext);
  const skip = pageContext.skip;
  const limit = pageContext.limit;
  console.log(skip,limit);
  const length = skip + limit;

  // const allPosts = data.swapi.posts.nodes;
  console.log(data.swapi.posts.nodes);
  //setPosts(allPosts);

  const allPosts = data.swapi.posts.nodes.slice(skip,length);
  console.log(allPosts);

    
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

  console.log(filteredData);
  setFilterData( filteredData );
  
  }, [filter] );


  useEffect ( () => {
    console.log("post to  updat");
   // const requiredPosts = filterData.slice(skip,length);
  // console.log(requiredPosts);
    setPosts(filterData);
    }, [filterData]
  );

  const handleInputFilter = event => {
    console.log("handle");
    setFilter(event.target.value);

    //const Posts = data.swapi.posts.nodes || [];
    // console.log(allPosts);

  }



  console.log(page)


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
      {/* <Pager pageContext={pageContext} /> */}
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
