import React from 'react'
import { useState , useEffect, useRef} from 'react';
import {FaSearch } from "react-icons/fa";
import api from "../api/local";
export default function Groups({setGroupData,setRome, groups ,setGroups, setMessages}) {
  const [groupSearch, setGroupSearch]= useState("myGroups")
  const [active, setActive]= useState(null)
  const userGrSearchRef=useRef()
    useEffect(() => {  
      const fetchdata = async () => {
        const responce = await api.get(`/group/search/${groupSearch}`);
        setGroups(responce.data.Groups);
      }
      fetchdata()
    }, [groupSearch])
    function setGrSearch(){
      if(userGrSearchRef.current.value.length > 0) {
        setGroupSearch(userGrSearchRef.current.value)
      } else {
        setGroupSearch("myGroups")
      }
      
    }
    
    
    async function openGroup(e){
      setMessages([])
      setRome(null)
     
      
        const id = e.target.id
        setActive(id)
        const responce = await api.get(`/group/`+id );
        

        setGroupData(responce.data);
        setMessages(responce.data.allmessages)
    }
  return (
    <div className='col'>
    <div className="search-bar center">
          <input type="text" placeholder="search for Friend"  ref={userGrSearchRef} onChange={setGrSearch} />
          <button type="button">
          <FaSearch />
          </button>
        </div>
        <div className="list">
          {groups.map((item) => (
            <div className={`link f-start ${active === item._id ? "active" : "" } `} key={item._id} id={item._id} onClick={openGroup}>
              <div className="s-img center">
              <img src={item.image} alt="" />
              </div>
              <div className="info space-b">
                <h4>{item.title}</h4>
                <small className="mess-count center hide">0</small>
              </div>
            </div>
          ))}
      </div>
    </div>
    
  )
}