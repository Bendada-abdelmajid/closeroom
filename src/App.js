import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import ChateRome from "./pages/ChateRome";
import api from "./api/local";
import { userContext } from "./context/userContext";
import LodingBage from "./components/LodingBage";

function App() {
  const [isLoding, setIsLoding] = useState(true);
  
  api.defaults.withCredentials = true;
  useEffect(() => {
    const getUser =  () => {
     api.get("/auth/check-user").then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setUser(resObject.user.__json);
        setTimeout(() => {
          setIsLoding(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });

     
    };
    getUser();
  }, []);

  const [user, setUser] = useState(null);

  api.defaults.withCredentials = true;
  return (
    <div className="App">
      <userContext.Provider value={{ user, setUser }}>
        <LodingBage isLoding={isLoding} />
        {user === null ? <Home /> : <ChateRome />}
      </userContext.Provider>
    </div>
  );
}

export default App;
