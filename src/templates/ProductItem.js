import * as React from "react"
import "../css/index.css"
import { Button, PlusIcon,MinusIcon } from '@cedcommerce/ounce-ui'
import  noProductImage  from '../images/noProductImage.jpg'
import { useState,useEffect } from "react"


const ProductItem = (props) => {

    console.log(props);
    const { product } = props;
    const { product_key } = props;
    const [ events, setevents ] = useState(0);

    console.log(product,product_key);

    let singleProductPrice = parseFloat(product[1].price.slice(1));
    let cart =  JSON.parse(localStorage.getItem('cedcommerce_cart'));
    let productQuantity = cart[product_key][3]['quantity']; 
    let totalProductPrice = productQuantity * singleProductPrice;
    let image_source="";

    image_source = product[0].sourceUrl !== "" ?  product[0].sourceUrl : noProductImage;

    useEffect(()=>{
      console.log("productItem","singleProductPrice",singleProductPrice,"productQuantity",productQuantity);
      props.callback(singleProductPrice,productQuantity);
    },[events])
                          

    return (
        <div class="shopping-item">
            <div class="shopping-buttons">
                <span class="shopping-delete-btn" onClick={()=>{console.log("delete");
                let currentCart = JSON.parse( localStorage.getItem('cedcommerce_cart') );
                currentCart.splice( product_key, 1 );
                console.log(currentCart);
                localStorage.setItem('cedcommerce_cart', JSON.stringify(currentCart));
                setevents(events + 1);
                    }}>del</span>
            </div>
        
            <div class="shopping-image">
                <img src={ image_source } alt="product-cart" width="100px" height="100px" />
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
                        let newQuantity;
                        if (quantity === 1 ) {
                            newQuantity = 1;
                        }else{
                            newQuantity = quantity - 1;
                        } 
                        
                        cart1[product_key].push({"quantity": newQuantity  });
                        localStorage.setItem('cedcommerce_cart', JSON.stringify(cart1));
                        setevents(events - 1);
                           }}>{""}</Button> 
                
                <p class="shopping-quantity-input" name="name" >{productQuantity}</p>
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
                      setevents(events + 1);
                      }}>{""}</Button>
            
            </div>
            <div class="total-price">{product[1].price}</div> 
            <div class="total-price">${totalProductPrice}</div>
        </div>
    )

}

export default ProductItem

