import React , {useContext, useState} from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut , FiPlus} from "react-icons/fi";

import {userContext} from "../context/userContext"
import Users from "./Users";
import Profile from "./Profile";
import Groups from "./Groups";
import CreateGroup from './CreateGroup'
export default function SideBar({users,setUsers, setRome , setGroupData, setMessages}) {
  const [seeProfile , setSeeProfile]=useState(false)
  const [openGroupeForm , setOpenGroupeForm]=useState(false)
  const [groups, setGroups]= useState([])
  function closeGroupeForm() {
    setOpenGroupeForm(false)
  }
  function hidProfile() {
    setSeeProfile(false)
  }
  
  
  function navigate(e) {
    document.querySelector(".side-bar .nav li.active").classList.remove('active')
    e.target.classList.add("active")
    document.querySelector('.side-bar .slide').style =`transform: translateX(${ -100 * parseInt(e.target.id) }%)`
  }
  function logout(){
    window.open(process.env.REACT_API_URL+"/auth/logout", "_self");
  }
  const { user } = useContext(userContext);
  
  return (
    <>
    <div className="side-bar">
    <Profile user={user} seeProfile={seeProfile} hidProfile={hidProfile} />
      <div className="header space-b">
        <div className="s-img center" onClick={()=>{setSeeProfile(true)}}>
         
          {user.picture ? <img src={user.picture} alt="" /> : <FaUser/> }
          
        </div>
       
        <div className="center">
          <div className="add-btn icon" onClick={()=>{setOpenGroupeForm(true)}}>
          <FiPlus />
          </div>
          <div className="logeout-btn icon" onClick={logout}>
            <FiLogOut />
          </div>
        </div>
      </div>
      <div className="romes">
      <ul className="open-rooms nav center" >

       <li onClick={navigate} className="nav-link active" id="0">Friends</li>
       <li className="border"></li>
       <li onClick={navigate} className="nav-link" id="1">Romes</li>
      </ul>
      <div className="slide">
    
        <Users users={users} setUsers={setUsers} setRome= {setRome} setGroupData={setGroupData} setMessages={setMessages} />
        <Groups setGroupData={setGroupData} setRome= {setRome} groups={groups} setGroups={setGroups} setMessages={setMessages}/>
      </div>
        
      </div>
      <CreateGroup  openGroupeForm={openGroupeForm} closeGroupeForm={closeGroupeForm} groups={groups} setGroups={setGroups} />
    </div>
    
    </>
  );
}
