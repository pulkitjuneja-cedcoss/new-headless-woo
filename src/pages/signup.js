import React from 'react';
import { useState } from 'react'
import  { Spinner, Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
import Header from '../templates/Header'
const axios = require('axios').default

const Signup = () => {

  const [ username, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmpassword, setConfirmPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ inProgress, setInProgress ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState('');
  const [ toastType, setToastType ] = useState('');
  const [ toast , setToast ] = useState(false)


  // const token = {
  //   Username: "admin",
  //   Password: "password"
  // }

  const createUser = async () => {
    
      if( username && password && confirmpassword && email && email.includes('.com') && password === confirmpassword ) {  
          setInProgress(true);

          try {
              const response = await axios.post('http://localhost/web4/wordpress/wp-json/wp/v2/users/',{
                username: username,
                password: password,
                email: email,
              },{
                headers:{
                  'Authorization': `Basic YWRtaW46cGFzc3dvcmQ=`
                }
              }); 
              console.log(response);
              //setApiResponse(response);
              setToast(true);
              setToastMessage("You have been successfully Registered");
              setToastType("success");
            } catch (error) {
              console.error("error", error);
              setToast(true);
              setToastType("error");
              if ( username == '' ) { setToastMessage("Please Enter a Username") }
              else if ( email == '' ) { setToastMessage("Please Enter you Email")   }
              else if ( !email.includes('.com') ){ setToastMessage("Please Enter a valid Email Address") }
              else if( password === confirmpassword ){ setToastMessage("Password and Confirm didn't match") }
              
            }
           setInProgress(false);
           
      }
     
      else{
        console.log("else")
        setToast(true);
        setToastType("error");
        if ( username == '' ) { setToastMessage("Please Enter a Username") }
        else if ( email == '' ) { setToastMessage("Please Enter you Email")   }
        else if ( email.includes('.com') ){ setToastMessage("Please Enter a valid Email Address") }
        else if( password != confirmpassword ){ setToastMessage("Password and Confirm didn't match") }
        // username ? setToastMessage("Please Enter a Username") : ('');
        // username ? setToastMessage("Please Enter a Username") : ('');
        // username ? setToastMessage("Please Enter a Username") : ('');
        
      }
    }
    
    
 
  return (


    inProgress ? ( <Spinner /> ) : (
      <div>
        <Header />

        <div class="login-page">

          < div class="form" >
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>
              <hr class="login-page-hr" />

              <input type="text" placeholder="Enter UserName" name="username"  onChange={ (e) => { setUserName(e.target.value) } }/>
              <input type="text" placeholder="Enter Email" name="email"  onChange={ (e) => { setEmail(e.target.value) } }/>
              <input type="password" placeholder="Enter Password" name="psw"  onChange={ (e) => { setPassword(e.target.value) } } />
              <input type="password" placeholder="Repeat Password" name="psw-repeat"  onChange={ (e) => { setConfirmPassword(e.target.value) } } />
          
              <input type="checkbox" checked="checked" name="remember"  /> Remember me     
              <p>By creating an account you agree to our <a href="/sgnup" >Terms & Privacy</a>.</p>
          
              <div class="clearfix">
                  <button type="button" class="cancelbtn">Cancel</button>
                  <button type="submit" class="signupbtn" onClick= { () => {createUser()} }>Sign Up</button>
              </div>
        </div>
          { toast &&
          <ToastWrapper >
              <Toast message={toastMessage??"jfjfk"} type={toastType} timeout={3000} onDismiss={()=>{
            setToast(false)}}/>
          
          </ToastWrapper> } 
        
        </div>
      
      </div>
    )
 
     
  );
};

export default Signup




  


