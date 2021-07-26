// import MenuPage from './templates/MenuPage'
// import { graphql,useStaticQuery } from 'gatsby';
const path = require('path');
// const { paginate } = require('gatsby-awesome-pagination');
// const { useStaticQuery,graphql } = require('gatsby');


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPost = path.resolve(`./src/templates/Blog.js`)
  // Fetch your items (blog posts, categories, etc).

  const result = await graphql(
  `query {
    swapi {
      posts {
        nodes {
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
      menuItems {
        edges {
          node {
            url
            path
            label
            id
          }
        }
      }
    }
    }
  `);
  console.log(result.data.swapi.posts.nodes);
  posts = result.data.swapi.posts.nodes;

  // paginate({
  //   createPage,
  //   items: result.data.swapi.posts.nodes,
  //   itemsPerPage: 2,
  //   pathPrefix: '/posts',
  //   component: blogPost
  // });
//  const i = 0;
  result.data.swapi.posts.nodes.map( node => {
    console.log(node);

    const path = "/" + node.slug;
    console.log(path);
    createPage({
      path,
      component: blogPost,
      context: {
        /*
        the value passed in the context will be available for you to use in your page queries as a GraphQL variable, as per the template snippet */
        postSlug: node.slug,
        post_id: node.id,
        post_title: node.title, 
      },
    });

  })

  console.log(result.data.swapi.menuItems.edges);

  const menuPage = path.resolve('src/templates/MenuPage.js');
           
  result.data.swapi.menuItems.edges.forEach(({ node }) => {
    const path = node.path;
    console.log(path);
    const path_slug = path.split("/");
    console.log(path_slug);
    const menuSlug = "/" + path_slug[3];
    const page_name = path_slug[3];
    console.log(menuSlug);
    const id = node.id;
    console.log(id);

    createPage({
      path,
      component: menuPage,
      context: {
        /*
        the value passed in the context will be available for you to use in your page queries as a GraphQL variable, as per the template snippet */
        pathSlug: menuSlug,
        page_id: id,
        page_name: page_name, 
      },
    });
  
  });
 

  // const result =  await graphql(`
  // query {
  //   swapi {
  //     posts {
  //       edges {
  //         node {
  //           date
  //           slug
  //           title
  //           uri
  //           content(format: RENDERED)
  //           id
  //           featuredImage {
  //             node {
  //               link
  //               slug
  //               title
  //               uri
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //  }
  // `);
  


  // paginate({
  //   createPage,
  //   items: result.data.swapi.posts.edges,
  //   itemsPerPage: 1,
  //   pathPrefix: '/posts',
  //   component: blogPost
  // });

};
  


  // exports.createPages = ({ graphql, actions }) => {
  //   const { createPage } = actions;
  
  //     return new Promise((resolve, reject) => {
  //       // to create the page we need access to the blog post template
  //       const page = path.resolve('src/templates/MenuPage.js');
  //       resolve(
  //         graphql(
  //             `query {
  //               swapi{
  //                 menuItems {
  //                   edges {
  //                     node {
  //                       url
  //                       path
  //                       label
  //                       id
  //                     }
  //                   }
  //                 }
  //               }  
  //             }
  //           `).then(result => {
  //           if (result.errors) {
  //             console.log(result.errors);
  //             reject(result.errors);
  //           }
  //           console.log(result.data.swapi.menuItems.edges);
           
  //           result.data.swapi.menuItems.edges.forEach(({ node }) => {
  //             const path = node.path;
  //             console.log(path);
  //             const path_slug = path.split("/");
  //             console.log(path_slug);
  //             const slug = "/" + path_slug[3];
  //             const page_name = path_slug[3];
  //             console.log(slug);
  //             const id = node.id;
  //             console.log(id);
    
  //             createPage({
  //               path,
  //               component: page,
  //               context: {
  //                 /*
  //                 the value passed in the context will be available for you to use in your page queries as a GraphQL variable, as per the template snippet */
  //                 pathSlug: slug,
  //                 page_id: id,
  //                 page_name: page_name, 
  //               },
  //             });
  //             resolve();
  //           });
  //         })
  //       );
  //     });
  //   };