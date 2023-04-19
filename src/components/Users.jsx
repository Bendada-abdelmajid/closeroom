import React from 'react'
import { useState , useEffect, useRef} from 'react';

import {FaSearch, FaUser } from "react-icons/fa";
import api from "../api/local";
export default function Users({users, setUsers, setRome, setGroupData, setMessages}) {
  
    
    const [userSearch, setUserSearch]= useState("friends")
    const [active, setActive]= useState(null)
    const userSearchRef=useRef()
   
    useEffect(() => {  
      const fetchdata = async () => {
        const responce = await api.get(`/user/search/${userSearch}`);
        setUsers(responce.data.users);
      }
      fetchdata()
    }, [userSearch])
    function setSearch(){
      if(userSearchRef.current.value.length > 0) {
        setUserSearch(userSearchRef.current.value)
      } else {
        setUserSearch("friends")
      }
      
    }
    async function openRome(e){
      setMessages([])
      setGroupData(null);
     
      const id = e.target.id
      setActive(id)
      const responce = await api.get(`/rome/`+id );

      setRome(responce.data);
      setMessages(responce.data.allmessages)
      const mesN=e.target.querySelector(".mess-count")
      mesN.innerHTML=0
      mesN.classList.add('hide')
    }
  return (
    <div className='col'>
    <div className="search-bar center">
          <input type="text" placeholder="search for Friend" ref={userSearchRef} onChange={setSearch}/>
          <button type="button">
          <FaSearch />
          </button>
        </div>
        <div className="list users scrollY">
          {users.map((item) => (
            <div className={`link f-start ${active === item.id ? "active" : "" } `} key={item.id} id={item.id} onClick={openRome}>
              <div className="s-img center">
              {item.image ? <img src={item.image} alt="" /> : <FaUser/>}
              </div>
              <div className="info space-b">
                <h4>{item.username}</h4>
                <div className="mess-count center hide">0</div>
              </div>
            </div>
          ))}
      </div>
    </div>
    
  )
}
