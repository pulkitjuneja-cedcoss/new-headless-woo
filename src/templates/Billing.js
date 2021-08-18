import * as React from "react"
import "../css/index.css"
import { useState,useEffect } from 'react'; 
import  Shipping  from "./Shipping"

const Billing = (props) => {

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

    const [ sameAdd, setSameAdd ] = useState(false);

    // const billingDetails = {
    //     "first_name": billingFirstName, "last_name": billingLastName, "companyName": billingCompanyName,
    //     "address_1": billingStreetAddress, "city": billingCity, "state": billingUserState,"country": billingCountry,
    //     "address_2": "", "postcode": billingPostalCode, "email": billingEmail,"phone": billingPhoneNumber,
    // }

    const OrderDetails = {
        "billing": "billingDetails",
        "shipping": "shippingdetails"
    }
    console.log(props);

    const BillingCallback = (shippingdetails) =>{
        console.log(shippingdetails);
    }

    useEffect( () => {
        console.log(props);
        // if(sameAdd){
              
        // } else{

        // }
       // sameAdd ? props.callback(shippingDetails)
    },[sameAdd] )

    return(
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


            {  sameAdd ? ( <Shipping data={OrderDetails} billingCallback= {BillingCallback} />) : (<Shipping data={""} />) }
            

        </div>
    )

}

export default Billing;