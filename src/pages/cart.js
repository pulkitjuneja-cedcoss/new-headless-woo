import * as React from "react"
import "../css/index.css"
import { Link } from "gatsby"
import { Button, PlusIcon,MinusIcon } from '@cedcommerce/ounce-ui'
import  noProductImage  from '../images/noProductImage.jpg'
import { useState } from "react"

const Cart = () => {
    const [ event, setEvent ] = useState(0);
    let items = JSON.parse( localStorage.getItem('cedcommerce_cart') );


    const dispayTotalAmoount = () => {
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
        return totalAmountPaid;
    }
    

    return (
        <div>
            {/* {console.log(items)} {console.log("helloooooooooooooo")} */}
            { items ?  ( 
                <div class="shopping-cart">
                    <div class="shopping-title"> Shopping Bag </div>

                     { Object.keys(items).map( (product_key) => {
                            console.log(product_key)  
                            let product = items[product_key];
                            let src = "";
                            let singleProductPrice = parseFloat(product[1].price.slice(1));
                            let cart =  JSON.parse(localStorage.getItem('cedcommerce_cart'));
                            let productQuantity = cart[product_key][3]['quantity']; 
                            let totalProductPrice = productQuantity * singleProductPrice;
                            
                            src = product[0].sourceUrl !== "" ?  product[0].sourceUrl : noProductImage;
                          
                            return (
                                <div class="shopping-item">
                                    <div class="shopping-buttons">
                                        <span class="shopping-delete-btn" onClick={()=>{console.log("delete");
                                        let currentCart = JSON.parse( localStorage.getItem('cedcommerce_cart') );
                                        currentCart.splice( product_key, 1 );
                                        console.log(currentCart);
                                        localStorage.setItem('cedcommerce_cart', JSON.stringify(currentCart));
                                        setEvent(event + 1);
                                            }}>del</span>
                                    </div>
                                
                                    <div class="shopping-image">
                                        <img src={src} alt="product-cart-image" width="100px" height="100px" />
                                    </div>
                                
                                    <div class="shopping-product-name">
                                        <span><b>{product[2].name}</b></span>
                                        
                                    </div>
                                
                                    <div class="shopping-quantity">
                                       
                                        <Button
                                            icon={MinusIcon}
                                            type="Plain"
                                            onClick={() => {
                                                let cart1 =  JSON.parse(localStorage.getItem('cedcommerce_cart'));
                                                let quantity = cart1[product_key][3]['quantity']; 
                                                cart1[product_key].pop();
                                                let newQuantity = quantity - 1;
                                                cart1[product_key].push({"quantity": newQuantity  });
                                                localStorage.setItem('cedcommerce_cart', JSON.stringify(cart1));
                                                setEvent(event - 1);
                                                   }}>{""}</Button> 
                                        
                                        <p class="shopping-quantity-input" name="name" >{product[3].quantity}</p>
                                        <Button
                                            icon={PlusIcon}
                                            type="Plain"
                                            onClick={() => {
                                              let cart2 =  JSON.parse(localStorage.getItem('cedcommerce_cart'));
                                              let quantity = cart2[product_key][3]['quantity']; 
                                              cart2[product_key].pop();
                                              let newQuantity = quantity + 1;
                                              cart2[product_key].push({"quantity": newQuantity  });
                                              localStorage.setItem('cedcommerce_cart', JSON.stringify(cart2));
                                              setEvent(event + 1);
                                              }}>{""}</Button>
                                    
                                    </div>
                                    <div class="total-price">{product[1].price}</div> 
                                    <div class="total-price">${totalProductPrice}</div>
                                </div>
                            )

                        }) }
                        <div class="total-amount">
                          <h3>Total amount to be Paid:         ${dispayTotalAmoount()}</h3> 
                          <Link to="/checkout">Checkout</Link> 
                        </div> 
                        
                </div>
            ) : <p> You have not added any product to cart till yet. Please add some product. <Link to="/shop">Back</Link></p>}
            
        </div>
    
           
    )


}


export default Cart;



