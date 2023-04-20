import "./App.css";
import React, { useState , useEffect} from "react";
import Home from "./pages/Home";
import ChateRome from "./pages/ChateRome";
import api from "./api/local";
import { userContext } from "./context/userContext";
import LodingBage from "./components/LodingBage";

function App() {
  const [isLoding , setIsLoding]= useState(false)
 
  useEffect(() => {
    const getUser = () => {
      console.log(process.env.REACT_APP_API_URL)
      console.log(process.env.REACT_APP_API_URL)
      console.log(process.env.REACT_APP_API_URL)
      console.log(process.env.REACT_APP_API_URL)
      fetch(process.env.REACT_APP_API_URL+"/auth/check-user", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user._json);
          setTimeout(()=>{
                  setIsLoding(false)
          }, 2000)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  
  const [user , setUser]= useState(null)
 
  api.defaults.withCredentials=true
  return (
    <div className="App">
     
        
      
      <userContext.Provider value={{ user , setUser }}>
      <LodingBage isLoding={isLoding}/>
        {user === null?<Home/>:<ChateRome/>}
      </userContext.Provider>
    
    </div>
  );
}

export default App;
