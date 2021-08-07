import * as React from "react"
import "../css/index.css"
import { Link } from "gatsby"
import { Button } from '@cedcommerce/ounce-ui'
import { useState } from 'react'; 
import CreateOrder from '../components/CreateOrder.js'
import success from '../images/success.png'
import cancel from '../images/cancel.png'
import { Modal,TextStyles } from '@cedcommerce/ounce-ui'

const Payment = (props) => {
   const [ paymentMethod, setPaymentMethod ] = useState('');
   const [ orderCreated, setOrderCreated ] = useState();
   const [ orderResponse, setOrderResponse ] = useState('');
   const [ modal, setModal ] = useState(false); 
    return(
        <div>
            <h2 class="payment-options-heading">Payment Options</h2>
            <div class="payment-options">
              <input type="radio" id="cashOnDelivery" name="payment_options" value="cashOnDelivery" onChange={ (e) => {
                setPaymentMethod("cashOnDelivery");
              }} />
              <label for="cashOnDelivery">Cash On Delivery</label>
              <input type="radio" id="credit/debit" name="payment_options" value="credit/debit"  onChange={ (e) => {
                setPaymentMethod("credit/debit");
              }}/>
              <label for="credit/debit">Credit/Debit Card</label>
              <input type="radio" id="paypal" name="payment_options" value="paypal"  onChange={ (e) => {
                setPaymentMethod("paypal");
              }}/>
              <label for="paypal">Paypal</label>
            </div>

            {
                orderCreated ? ( <Modal 
                    open={modal}
                    heading=""
                    secondaryAction={{content:"Close",thickness:"thin",onAction:()=>{ setModal(false)} }}
                    close={ () => { setModal(false) } }
                >                 
                <img src={success} width="100px" height="100px" alt="order created successfully" />    
                <TextStyles type={'neutralText'}
                    children={
                        <div>{console.log(orderCreated)}
                            <h3>Your Order has been created successfully. Thankyou for ordering.</h3>  
                            <h4>Your Order Id:{ console.log(orderResponse)}{orderResponse.id}</h4>
                            <Link to="orderStatus">View Order Status</Link>
                        </div>
                    }/>  

                </Modal>
                )  : (
                        <Modal 
                            open={modal}
                            heading=""
                            secondaryAction={{content:"Close",thickness:"thin",onAction:()=>{ setModal(false)} }}
                            close={ () => { setModal(false) } }
                        >                 
                            <img src={cancel} alt="order created successfully" />    
                            <TextStyles type={'neutralText'}
                                children={ <div><h4>Your Order cannot be placd now. Try Again.</h4> </div>
                            }/>
                        </Modal>
                )
            }
            {
                paymentMethod == "cashOnDelivery" ? (<p>cash</p>) : (<></>)
                
            }
            {
                paymentMethod == "credit/debit" ? (
                <div class="credit-debit-container">    
                   <div class="credit-debit-row"> 
                        <div class="credit-debit-col-50">
                            {/* <label for="fname">Accepted Cards</label> */}
                            <label for="cname">Name on Card</label>
                            <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                            <label for="ccnum">Credit card number</label>
                            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                            <label for="expmonth">Exp Month</label>
                            <input type="text" id="expmonth" name="expmonth" placeholder="September" />
                
                            <div class="credit-debit-row">

                                <div class="credit-debit-col-50">
                                    <label for="expyear">Exp Year</label>
                                    <input type="text" id="expyear" name="expyear" placeholder="2018"/>
                                </div>
                                <div class="credit-debit-col-50">
                                    <label for="cvv">CVV</label>
                                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                                </div>
                            
                            </div>

                        </div>
                    </div>
                </div>
                ) : (<></>)
               
            }
            {
                paymentMethod == "paypal" ? (<p>paypal</p>) : (<></>)
            }
            <Button onClick={() => { console.log('createOrder'); 
               let result = CreateOrder(props.orderData);
                console.log(result);
                result.then((response)=>{
                    console.log("result",response);
                    if( response !== undefined ){
                        setOrderResponse(response.data);
                        setModal(true);
                        setOrderCreated(true);
                       
                    }
                     
                }).then((error)=>{
                    console.log(error);
                    if(error !== undefined){
                        setModal(true);
                        setOrderCreated(false);
                        setOrderResponse(error);
                    }}) } }>Place Order</Button>
        </div>
    )


}

export default Payment