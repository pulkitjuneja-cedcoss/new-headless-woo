import React from 'react';
import { useState } from 'react'
import  { Spinner, Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
import { navigate } from 'gatsby'
import Header from '../templates/Header'
const axios = require('axios').default


const Login = () => {

  const [ username, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ inProgress, setInProgress ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState('');
  const [ toastType, setToastType ] = useState('');
  const [ toast , setToast ] = useState(false)


  const authenticateUser = async () => {
    // setTrigger(false);

      if( username && password ) {  
          setInProgress(true);

          try {
              const response =  await axios.get('http://localhost/web4/wordpress/wp-json/wp-rest-api/v1/authenticate-user',{
                headers: {
                  'Authorization': `Basic ` +  btoa(username + ':' + password) 
                }
               
              }
              ); 
              console.log(response);
              //setApiResponse(response);
              localStorage.setItem('user', response.data.data )
              setToast(true);
              setToastMessage("You have been successfully Loged In");
              setToastType("success");
              navigate(
                "/shop",
                {
                  state:  response.data.data ,
                }
              )
            } catch (err) {
              console.log("errrrrrrrrrr");
              console.log("response")
              console.log(err.message);
              console.log(err.code);
              console.log(err.data);
              setToast(true);
              setToastType("error");
              setToastMessage(" Invalid Username or Password "); 
              
            }
           setInProgress(false);
           
      }
     
      else{
        console.log("else")
        setToast(true);
        setToastType("error");
        if ( username == '' ) { setToastMessage("Please Enter a Username") }
        else if( password == '' ){ setToastMessage(" Please Enter a  ") }
        
      }
    }
 
  return (
    inProgress ? ( <Spinner /> ) : (

      <div>
        <Header />
    
        <div class="login-page">
          <div class="form">
            <div class="login">
              <div class="login-header">
                <h3>LOGIN</h3>
                <p>Please enter your credentials to login.</p>
              </div>
            </div>
            {/* <form class="login-form"> */}
              <input type="text" placeholder="username" onChange = { (e) => { setUserName(e.target.value) } } />
              <input type="password" placeholder="password" onChange = { (e) => { setPassword(e.target.value) } } />
              <button onClick = { () => { authenticateUser() } }>login</button>
              <p class="message">Not registered? <a href="/login">Create an account</a></p>
            {/* </form> */}
          </div>
          { 
          toast &&
            <ToastWrapper >
                <Toast message={toastMessage??"jfjfk"} type={toastType} timeout={3000} onDismiss={()=>{ setToast(false)}}/>
            </ToastWrapper> 
          } 
        </div>

      </div> 
    ) 
  
  );
};

export default Login




  


