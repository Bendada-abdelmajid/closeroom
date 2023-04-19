import React  from "react";

import "./home.css"
export default function Home() {
 
  function login() {
    window.open(process.env.REACT_API_URL+"/auth/google", "_self");
  }
  return (
    <>
    <div className="hero container">
      <div className="logo">CLOSEROOM</div>
      <div className="grid content">
        <div className="left col">
           
           <h5>Simple, Secure</h5>
            
            
        
          <h5 className="last col">Groubs</h5>
          <p>
            With CloseRome, you'll get fast, simple, secure messaging for free
            with randome pepoale , available all over the world.
          </p>
          <button className="main-btn" onClick={login}>Join now</button>
        </div>
        <div className="right">
            <img src="/Connected-cuate.svg" alt="" />
        </div>
        <div className="col">
        <h4 >Security by Default</h4>
        <p className="p"> your messages and calls are secured so only you and the person you're communicating with can read  and nobody in between, not even us.</p>
      </div>
      <div className="col">
        <h4>Document Sharing Made Easy</h4>
        <p className="p"> Send PDFs, documents,pictures, and more, without the hassle of email or file sharing apps. You can send documents , so it's easy to get what you need over to who you want..</p>
      </div>

      </div>
  
      
      
      
      <div className="bg-y"></div>
    </div>
    
    </>
    

  );
}
