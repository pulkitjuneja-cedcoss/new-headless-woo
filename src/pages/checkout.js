import * as React from "react"
import "../css/index.css"
import { Link } from "gatsby"
// import { Button,Modal,TextStyles,PlusIcon,MinusIcon } from '@cedcommerce/ounce-ui'
import { useState,useEffect } from 'react'; 
import  noProductImage  from '../images/noProductImage.jpg'
import Payment from './payment'

const Checkout = (props) => {
   
    const [ billingFirstName, setBillingFirstName ] = useState("");
    const [ billingLastName, setBillingLastName ] = useState("");
    const [ billingCompanyName, setBillingCompanyName ] = useState("");
    const [ billingStreetAddress, setBillingStreetAddress ] = useState("");
    const [ billingCity, setBillingCity ] = useState("");
    const [ billingCountry, setBillingCountry ] = useState("");
    const [ billingUserState, setBillingUserState ] = useState("");
    const [ billingEmail, setBillingEmail ] = useState("");
    const [ billingPostalCode, setBillingPostalCode ] = useState("");
    const [ billingPhoneNumber, setBillingPhoneNumber ] = useState("");

    const [ shippingFirstName, setShippingFirstName ] = useState("");
    const [ shippingLastName, setShippingLastName ] = useState("");
    const [ shippingCompanyName, setShippingCompanyName ] = useState("");
    const [ shippingStreetAddress, setShippingStreetAddress ] = useState("");
    const [ shippingCity, setShippingCity ] = useState("");
    const [ shippingCountry, setShippingCountry ] = useState("");
    const [ shippingUserState, setShippingUserState ] = useState("");
    const [ shippingEmail, setShippingEmail ] = useState("");
    const [ shippingPostalCode, setShippingPostalCode ] = useState("");
    const [ shippingPhoneNumber, setShippingPhoneNumber ] = useState("");
    
    const [ sameAdd, setSameAdd ] = useState(false);
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

    const OrderDetails = {
        "billing":{
          "first_name": billingFirstName, "last_name": billingLastName, "companyName": billingCompanyName,
          "address_1": billingStreetAddress, "city": billingCity, "state": billingUserState,"country": billingCountry,
          "address_2": "", "postcode": billingEmail, "email": billingPostalCode,"phone": billingPhoneNumber,
        },
        "shipping":{ 
          "first_name": shippingFirstName, "last_name": shippingLastName, "companyName": shippingCompanyName,
          "address_1": shippingStreetAddress,"city": shippingCity,"state": shippingUserState,"country": shippingCountry,
          "address_2": "", "postcode": shippingPostalCode, "email": shippingEmail,"phone": shippingPhoneNumber,
        }
    }

    useEffect( () => {
        if( sameAdd ){
            console.log("useEffect if",billingFirstName)
            setShippingFirstName(billingFirstName);
            setShippingLastName(billingLastName);
            setShippingStreetAddress(billingStreetAddress);
            setShippingCity(billingCity)
            setShippingUserState(billingUserState);
            setShippingCountry(billingCountry);
            setShippingCompanyName(billingCompanyName);

        } else{
            console.log("useEffect else")
            setShippingFirstName("");
            setShippingLastName("");
            setShippingStreetAddress("");
            setShippingCity("")
            setShippingUserState("");
            setShippingCountry("");
            setShippingCompanyName('');
        }
    
    },[sameAdd])

    return (
          <div class="checkout">
            <div class="row">
                <h1><b>Checkout Page</b></h1>
                <div class="column"> 
                    <div class="billing">
                        <h2><b>Billing Details</b></h2>
                        <div class="billing-details">
                            <label for="billing-firstName">First Name*</label>
                            
                            <input id="billing-firstName" onChange={(e)=>{
                            setBillingFirstName(e.target.value)}}  />
                        </div>
                       

                        <div class="billing-details">
                            <label for="billing-lastName">Last Name*</label>
                            
                            <input id="billing-lastName" onChange={(e)=>{
                            setBillingLastName(e.target.value)}}/>
                        </div>

                        <div class="billing-details">
                            <p>Company Name</p> 
                            <input id="billing-companyName" onChange={(e)=>{
                            setBillingCompanyName(e.target.value)}}/>
                        </div>

                        <div class="billing-details">
                            <p>Email*</p>
                            <input id="billing-email" onChange={(e)=>{
                            setBillingEmail(e.target.value)}}/>
                        </div>

                        <div class="billing-details">
                            <p>Phone Number*</p>
                            <input id="billing-phonenumber" onChange={(e)=>{
                            setBillingPhoneNumber(e.target.value)}}/>
                        </div>

                        <div class="billing-details">
                            <p>Postal Code*</p>
                            <input id="billing-postalcode" onChange={(e)=>{
                            setBillingPostalCode(e.target.value)}}/>
                        </div>

                        <div class="billing-details">
                            <p>Country*</p>
                            <input id="billing-country" onChange={(e)=>{
                            setBillingCountry(e.target.value)}}/>
                        </div>
                        
                        <div class="billing-details">
                            <p>Street Address*</p>
                            <input id="billing-streetAddress" onChange={(e)=>{
                            setBillingStreetAddress(e.target.value)}}/>
                        </div>
                        
                        <div class="billing-details">
                            <p>Town/City*</p>
                            <input id="billing-city" onChange={(e)=>{
                            setBillingCity(e.target.value)}}/>
                        </div>
                        
                        <div class="billing-details">
                            <p>State*</p>
                            <input id="billing-state" onChange={(e)=>{
                            setBillingUserState(e.target.value)}}/>
                        </div>
                        
                    </div>
                   
                    <label>
                        <input type="checkbox" name="sameadr" onChange={()=>setSameAdd(!sameAdd)}/> Shipping address same as billing
                    </label>

                    <div class="shipping">
                        <h2><b>Shipping Details</b></h2>
                        <div class="shipping-details">
                            <label for="shipping-firstName">First Name*</label>
                            
                            <input id="shipping-firstName" value={shippingFirstName} onChange={(e)=>{
                            setShippingFirstName(e.target.value)}}  />
                        </div>
                        <div class="shipping-details">
                            <label for="shipping-lastName">Last Name*</label>
                            
                            <input id="shipping-lastName" value={shippingLastName} onChange={(e)=>{
                            setShippingLastName(e.target.value)}}/>
                        </div>

                        <div class="shipping-details">
                            <p>Company Name</p> 
                            <input id="shipping-companyName" value={shippingCompanyName} onChange={(e)=>{
                            setShippingCompanyName(e.target.value)}}/>
                        </div>

                        <div class="shipping-details">
                            <p>Email*</p>
                            <input id="shipping-email" onChange={(e)=>{
                            setShippingEmail(e.target.value)}}/>
                        </div>

                        <div class="shipping-details">
                            <p>Phone Number*</p>
                            <input id="shipping-phonenumber" onChange={(e)=>{
                            setShippingPhoneNumber(e.target.value)}}/>
                        </div>

                        <div class="shipping-details">
                            <p>Postal Code*</p>
                            <input id="shipping-postalcode" onChange={(e)=>{
                            setShippingPostalCode(e.target.value)}}/>
                        </div> 
 
                        <div class="shipping-details">
                            <p>Country*</p>
                            <input id="shipping-country" value={shippingCountry} onChange={(e)=>{
                            setShippingCountry(e.target.value)}}/>
                        </div>
                        
                        <div class="shipping-details">
                            <p>Street Address*</p>
                            <input id="shipping-streetAddress" value={shippingStreetAddress} onChange={(e)=>{
                            setShippingStreetAddress(e.target.value)}}/>
                        </div>
                        
                        <div class="shipping-details">
                            <p>Town/City*</p>
                            <input id="shipping-city" value={shippingCity} onChange={(e)=>{
                            setShippingCity(e.target.value)}}/>
                        </div>
                        
                        <div class="shipping-details">
                            <p>State*</p>
                            <input id="shipping-state" value={shippingUserState} onChange={(e)=>{
                            setShippingUserState(e.target.value)}}/>
                        </div>
                        
                    </div>
                </div>
                <div class="column">
                  <h2><b>Your Order</b></h2>
                  <hr></hr>
                    <div class="checkout-shipping-cart-contents">
                        <p class="checkout-shipping-cart-content">Product Image</p>
                        <p class="checkout-shipping-cart-content">Name</p>
                        <p class="checkout-shipping-cart-content">Quantity</p>
                        <p class="checkout-shipping-cart-content">Price</p>
                        <p class="checkout-shipping-cart-content">Total Price</p>

                    </div>
                  <hr></hr>
                    <div>
                        { items ?  ( 
                            <div >
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
                                            <div class="checkout-shopping-item">
                                                <div class="checkout-shopping-buttons">
                                                    <span class="shopping-delete-btn"></span>
                                                    <span class="shopping-like-btn"></span>
                                                </div>
                                            
                                                <div class="checkout-shopping-image">
                                                    <img src={src} alt="product-cart-image" width="50px" height="50px" />
                                                </div>
                                            
                                                <div class="checkout-shopping-product-name">
                                                    <span>{product[2].name}</span>
                                                    
                                                </div>
                                            
                                                <div class="checkout-shopping-quantity">                 
                                                    <p name="name" >{product[3].quantity}</p>
                                                </div>
                                                <div class="checkout-total-price">{product[1].price}</div> 
                                                <div class="checkout-total-price">${totalProductPrice}</div>
                                            </div>
                                        )

                                    }) }
                                    <div class="checkout-total-amount">
                                    <h3>Total amount to be Paid:         ${dispayTotalAmoount()}</h3> 
                                    <Link to="/cart">Back</Link> 
                                    </div> 
                                    
                            </div>
                        ) : <p> You have not added any product to cart till yet. Please add some product. <Link to="/shop">Back</Link></p>}
                        
                    </div>
                    
                </div>
                
            </div>{
                console.log("billing",
                billingFirstName,billingLastName, billingStreetAddress, billingCity,billingUserState, billingCountry ,
                billingEmail,billingPostalCode, billingPhoneNumber
            
                )
            }
            {
               billingFirstName && billingLastName && billingStreetAddress && billingCity && billingUserState && billingCountry &&  billingEmail && billingPostalCode && billingPhoneNumber? (
            //    <Link to="/payment">Proceed to Payment</Link>
               <Payment  orderData={OrderDetails}   />
               ) : <></>
             }
         </div>

       // </div>
        
    )


}

export default Checkout;