// // import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// const api = new WooCommerceRestApi({
//   url: process.env.WORDPRESS_STORE_URL,
//   consumerKey: process.env.WC_CONSUMER_KEY,
//   consumerSecret: process.env.WC_CONSUMER_SECRET,
//   version: "wc/v3"
// });


// /**
//  *   CREATE ORDER
//  *  @see https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#create-an-order
//  */


// export const createOrder = async () => {
//     const {data} = await api.post( "orders", {
//     name: "Premium Quality", 
//     type: "simple",
//     regular_price: "21.99",
//    })
//     .then((response) => {
//       // Successful request
//       console.log("Response Status:", response.status);
//       console.log("Response Headers:", response.headers);
//       console.log("Response Data:", response.data);
//     })
//     .catch((error) => {
//       // Invalid request, for 4xx and 5xx statuses
//       console.log("Response Status:", error.response.status);
//       console.log("Response Headers:", error.response.headers);
//       console.log("Response Data:", error.response.data);
//     })
//     .finally(() => {
//       // Always executed.
//     });

//}    


const axios = require('axios').default

 const CreateOrder =  async (orderData) => {

  console.log(orderData);

  try {
    const response = await axios.post('https://localhost/web4/wordpress/wp-json/wc/v3/orders?consumer_key='
    + process.env.REACT_APP_WC_CONSUMER_KEY + '&consumer_secret=' + process.env.REACT_APP_WC_CONSUMER_SECRET,
    {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      billing: orderData.billing,
      shipping: orderData.shipping,
      line_items: [
        {
          product_id: 601,
          quantity: 2
        },
        {
          product_id: 608,
          quantity: 1
        }
      ]
    }
    ); 
    //console.log(response);
    return response;
   
  } catch (error) {
    //console.error(error);
    return error;
    
  }

}


export default CreateOrder