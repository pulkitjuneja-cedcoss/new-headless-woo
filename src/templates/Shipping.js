import * as React from "react"
import "../css/index.css"
import { useState,useEffect } from 'react'; 



const Shipping = (props) => {
    
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


    console.log(props);

    const shippingDetails = {
        "first_name": shippingFirstName, "last_name": shippingLastName, "companyName": shippingCompanyName,
        "address_1": shippingStreetAddress, "city": shippingCity, "state": shippingUserState,"country": shippingCountry,
        "address_2": "", "postcode": shippingPostalCode, "email": shippingEmail,"phone": shippingPhoneNumber,
    }

    useEffect( () => {
        console.log("useEffect");
        if ( props.data !== null && props.data !== undefined && props.data.length !== 0  ){
            console.log("if");
            setShippingFirstName( props.data.first_name );
            setShippingLastName( props.data.last_name );
            setShippingStreetAddress( props.data.address_1 );
            setShippingCity( props.data.city )
            setShippingUserState( props.data.state );
            setShippingCountry( props.data.country );
            setShippingCompanyName( props.data.company );
            setShippingEmail( props.data.email );
            setShippingPostalCode( props.data.postcode );
            setShippingPhoneNumber( props.data.phone );

        }
        else{
            console.log("else");
            setShippingFirstName("");
            setShippingLastName("");
            setShippingStreetAddress("");
            setShippingCity("")
            setShippingUserState("");
            setShippingCountry("");
            setShippingCompanyName('');
            setShippingEmail('');
            setShippingPostalCode('');
            setShippingPhoneNumber('');
        }
        
    },[props.data])

    console.log("shipping",props)

    useEffect( (props) =>{
        console.log("shipping",props)
        props.BillingCallback(shippingDetails);
    },[ shippingFirstName,  shippingLastName,  shippingCompanyName,
     shippingStreetAddress, shippingCity,  shippingUserState, shippingCountry,
      shippingPostalCode,  shippingEmail, shippingPhoneNumber])
    return (
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
                            <input id="shipping-email"  value={shippingEmail} onChange={(e)=>{
                            setShippingEmail(e.target.value)}}/>
                        </div>

                        <div class="shipping-details">
                            <p>Phone Number*</p>
                            <input id="shipping-phonenumber" value={shippingPhoneNumber} onChange={(e)=>{
                            setShippingPhoneNumber(e.target.value)}}/>
                        </div>

                        <div class="shipping-details">
                            <p>Postal Code*</p>
                            <input id="shipping-postalcode" value={shippingPostalCode} onChange={(e)=>{
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
               
    )
}

export default Shipping;