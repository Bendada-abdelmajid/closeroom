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
    const getUser = async () => {
      const response = api.get(
        process.env.REACT_APP_API_URL + "/auth/check-user"
      );
      console.log(response)
      if (response.status === 200) {
        const res = await response.json();
        setUser(res.user._json);
       
      }

      setTimeout(() => {
        setIsLoding(false);
      }, 2000);
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
