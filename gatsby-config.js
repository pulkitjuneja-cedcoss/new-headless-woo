module.exports = {
  siteMetadata: {
    title: "second-app",
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "SWAPI",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "swapi",
        // Url to query from
        url: "http://localhost/web4/wordpress/graphql",
      },
    },
    // {
    //   resolve: "gatsby-source-wordpress",
    //   options: {
    //     url: "http://localhost/web4/wordpress/graphql",
    //     schema: {
    //       timeout: 3000000,
    //     },
    //     // verboseOutput: false,
    //     // perPage: 100,
    //     // concurrentRequests: 10,
        
    //     // normalizer: function({ entities }) {
    //     //   return entities
    //     // },
    //   },
    // },
    // {       
    //   resolve: '@pasdo501/gatsby-source-woocommerce',
    //   options: {
    //     // Base URL of Wordpress site
    //     api: 'http://localhost/web4/wordpress',
  
    //     // set to false to not see verbose output during build 
    //     // default: true
    //     verbose: true,
  
    //     // true if using https. otherwise false.
    //     https: false,
    //     api_keys: {
    //       consumer_key: `ck_84196c6d752e8e8ae8f4e6961862a3f93441b7fb`,
    //       consumer_secret: `cs_7d76a232379a237c4c84b94ae02ab0e467843cee`,
    //     },
    //     // Array of strings with fields you'd like to create nodes for...
    //     fields: ['products', 'products/categories', 'products/attributes'],
    //     // Send the API keys as query string parameters instead of using the authorization header
    //     // OPTIONAL: defaults to false
    //     query_string_auth: false,
    //     // Version of the woocommerce API to use
    //     // OPTIONAL: defaults to 'wc/v3'
    //     api_version: 'wc/v3',
    //     // OPTIONAL: How many results to retrieve *per request*
    //     per_page: 100,
    //     // OPTIONAL: Custom WP REST API url prefix, only needed if not using 
    //     // the default prefix ('wp-json').
    //     // wpAPIPrefix: 'wp-json',
    //     // OPTIONAL: Support for URLs with ports, e.g. 8080; defaults to no port
    //     // port: '8080',
    //     // OPTIONAL: Encoding; default to 'utf8'
    //     encoding: 'utf8',
    //     // OPTIONAL: Custom Axios config (see https://github.com/axios/axios) - note that this can override other options.
    //     // axios_config: {
    //     //   // Axios config options
    //     // }
    //   }
    // },


    "gatsby-plugin-theme-ui",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
