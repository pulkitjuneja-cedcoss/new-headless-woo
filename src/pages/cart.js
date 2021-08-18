import * as React from "react"
import "../css/index.css"
import { Link } from "gatsby"
import ProductItem from "../templates/ProductItem"
import { Button } from '@cedcommerce/ounce-ui'
import {useEffect,useState} from 'react'

const Cart = () => {
    const [ totalAmountPaid, setTotalAmountPaid ] = useState(0);
    let items = JSON.parse( localStorage.getItem('cedcommerce_cart') );

    useEffect( () => {
      console.log("useEffect");
    },[])


    const callback = (price,quant) =>{
        console.log("cart",price)
        console.log(totalAmountPaid)
        setTotalAmountPaid(totalAmountPaid + price )
      //  dispayTotalAmoount(price)
    }

    const dispayTotalAmoount = (details) => {
        console.log(details,typeof(details));
        let totalAmountPaid = 0;
        if( items !== null && items !== undefined ){
            Object.keys(items).map( (product_key) => {
                console.log(product_key) ;
                let product = items[product_key]; 
                let cart =  JSON.parse(localStorage.getItem('cedcommerce_cart'));
                let productQuantity = cart[product_key][3]['quantity']; 
                let singleProductPrice = parseFloat(product[1].price.slice(1));
                let totalProductPrice = productQuantity * singleProductPrice;
                totalAmountPaid = totalAmountPaid + totalProductPrice;
            })    
        } 
       return totalAmountPaid + parseFloat(details);
    }
    

    return (
        <div>
            {/* {console.log(items)} {console.log("helloooooooooooooo")} */}
            { ( items !== null && items !== undefined ) ?  ( 
                <div class="shopping-cart">
                    <div class="shopping-title"> Shopping Bag </div>

                     { Object.keys(items).map( (product_key) => {
                            console.log(product_key)  
                            let product = items[product_key];

                            return (
                                <div>
                                <ProductItem  product={ product } product_key={product_key} callback={callback} />
                                {
                                    console.log(product_key,product)
                                }
                                </div>
                            )
                            
                        }) }
                        <div class="total-amount">
                
                          <h3>Total amount to be Paid:         ${totalAmountPaid}</h3> 
                          <Link to="/checkout">Checkout</Link> 
                        </div> 
                        
                </div>
            ) : <p> You have not added any product to cart till yet. Please add some product. <Link to="/shop">Back</Link></p>}
            
        </div>
    
           
    )


}


export default Cart;



