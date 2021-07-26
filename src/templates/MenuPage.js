import React from 'react';
import { graphql,useStaticQuery } from 'gatsby';
// import data from '../Page'

const MenuPage = ({data}) => {
  
 console.log(data);

// return(
//   <div>i from menupage</div>
// )

 let source,desc;
   const {title,content,featuredImage}  = data.swapi.page;
   if(featuredImage == null ){
     source = "";
     desc = "";
   }else{
     source = featuredImage.node.sourceUrl;
   }
 
 
  return (
    <div>
      <div className="post-wrapper">
        {/* <Title>{title}</Title> */}
        <h1> i am from {title} page</h1>
        {
            data.swapi.posts.edges.map(edge => {
             console.log(edge.node);
             const postImage = edge.node.featuredImage;
             const postTitle = edge.node.title;
             const postContent = edge.node.content;
             if( title == "Blog" ){
              return ( 
                <div>
                  <h2>{postTitle}</h2>
                  <p>{postContent}</p>
                  <p></p>
                </div>
              )

             }
             
           })
          
        }
        <img src={source} alt={desc} width="800px" height="400px" />
        <div>
          <p>{title}: {content}</p>
        </div>
        {/* <div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} /> */}

      </div>
      <div><p>hi, I am from menu page</p></div>
    </div>
  );
};

export default MenuPage


//console.log($pathSlug);
export const query = graphql`
  query($pathSlug: ID!){
    swapi{
      page( id: $pathSlug, idType: URI ) {
        id
        content(format: RENDERED)
        link
        slug
        title
        featuredImageId
        featuredImage {
          node {
            altText
            id
            sourceUrl
            description
          }
        }
      }
      posts {
        edges {
          node {
            date
            slug
            title
            uri
            content(format: RENDERED)
            id
            featuredImage {
              node {
                link
                slug
                title
                uri
              }
            }
          }
        }
      }
    }
  }   
  `;


  


