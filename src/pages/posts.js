import React from 'react';
import "../css/index.css"
// import Pager from '../components/pager'
import PostTemplate from '../templates/PostTemplate';
import { graphql,useStaticQuery } from 'gatsby';
import {useState, useEffect} from 'react';


const Posts = ({data}) => {

  const [ filter, setFilter ] = useState("");
  const [ filterData, setFilterData ] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(1);


  const hasPreviousPage = () => {
    console.log(posts);
    let p = page > 1 ? ( page - 1 ) : 1 ; 
    setPage(p);
   
  }

  const hasNextPage = () => {
    console.log(posts);
    let q = page + 1; 
    setPage(q);
   
  }

  console.log(data.swapi.posts.nodes);
  const limit = 2;
  const skip = ( page - 1 ) * limit;
  console.log(skip,limit);
  const length =  skip + limit;
  const allPosts = data.swapi.posts.nodes;


   useEffect( () =>{
        console.log("hi",skip,limit,length);
        const Data = [];
    
        // const sol = filter.length > 0 ?  posts : allPosts;
      //  console.log("sol",sol);
        allPosts.map( post => {    
            const { title } = post;
            if( filter !== "" ){
                console.log("searchValue",title.search(filter));
                if( title.search(filter) >= 0 ){
                Data.push(post);
                }
            }else{
                Data.push(post);
            }  
            })

        console.log(Data);
       // setFilterData( filteredData );
        const requiredPosts = Data.slice(skip,length);
        console.log(requiredPosts);
        setPosts(requiredPosts);
        // const allRequiredPosts = data.swapi.posts.nodes.slice(skip,length);
        // console.log("allRequiredPosts",allRequiredPosts);
        // setPosts(allRequiredPosts);
    },[page]);
    
    useEffect( ()=>{
        console.log("called for setting filter");
        setPage(1);
        const filteredData = [];
        console.log("allposts",allPosts);
        console.log("posts",posts);
        //  const sol = filter.length > 0 ?  posts : allPosts;
        const sol =  allPosts;
        console.log("sol",sol);
        sol.map( post => {    
        const { title } = post;
        if( filter !== "" ){
            console.log("searchValue",title.search(filter));
            if( title.search(filter) >= 0 ){
            filteredData.push(post);
            }
        }else{
            filteredData.push(post);
        }  
        })

        console.log(filteredData);
       // setFilterData( filteredData );
       const requiredPosts = filteredData.slice(skip,length);
        console.log(requiredPosts);
        setPosts(requiredPosts);
        //setPosts(filteredData);
    }, [filter] );


    // useEffect ( () => {
    //     console.log("post to  updat",skip,length,posts);
    //     const requiredPosts = allPosts.slice(skip,length);
    //  //   const requiredPosts = filterData;
    //     console.log(requiredPosts);
    //     setPosts(requiredPosts);
    //     }, [filterData]
    // );

    const handleInputFilter = event => {
        console.log("handle");
        setFilter(event.target.value);
    }


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
      //console.log(page,skip,limit,posts)
       // allRequiredPosts = posts.slice(skip,length);
        posts.map( node => {
          const title = node.title || node.slug
          return (
            <PostTemplate 
            title={title} 
            path = {node.link}
            />
          )
        })
      }
     
      <button onClick={hasPreviousPage}>PreviousPage</button>
      <button onClick={hasNextPage}>NextPage</button>
    </div>
  )

};

export default Posts;

export const que = graphql`
query ( $filter: String  ){
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

