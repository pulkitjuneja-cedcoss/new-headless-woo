import React from 'react';


const Signup = () => {
 
  return (

    <div class="login-page">
        < div class="form" >
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr/>
    
            <input type="text" placeholder="Enter Email" name="email"  />
            <input type="password" placeholder="Enter Password" name="psw"  />
            <input type="password" placeholder="Repeat Password" name="psw-repeat"  />
        
            <input type="checkbox" checked="checked" name="remember"  /> Remember me     
            <p>By creating an account you agree to our <a href="/sgnup" >Terms & Privacy</a>.</p>
        
            <div class="clearfix">
                <button type="button" class="cancelbtn">Cancel</button>
                <button type="submit" class="signupbtn">Sign Up</button>
            </div>
      </div>
    </div>
 
     
  );
};

export default Signup




  


