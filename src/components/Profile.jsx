import React, { useState , useRef, useContext} from 'react';
import { FaCheck, FaLongArrowAltLeft, FaPencilAlt, FaUser } from 'react-icons/fa'
import {RiCameraLensFill } from 'react-icons/ri'
import {userContext} from "../context/userContext"
import api from "../api/local";
export default function Profile({ user, seeProfile, hidProfile }) {
   
    api.defaults.withCredentials=true
    const { setUser } = useContext(userContext);
    const [editUsername, setEditUsername] = useState(false)
    const [alert, setAlert] = useState([]);
    const userImageRef = useRef();
    const usernameRef = useRef();
 
    function clickImage() {
        userImageRef.current.click();
      }
   
    async function editeProfile(e) {
        e.preventDefault();
        if(usernameRef.current.value !== user.username) {
            const responce = await api.post(`/user/editUsername/${user._id}`, {username:usernameRef.current.value});
          const alert=responce.data.data.alert
          const type=responce.data.data.type
          setAlert({alert,type})
          console.log(responce.data.data.user)
          if(responce.data.data.user) {
            setUser(responce.data.data.user)
            console.log(user)
          }
        }
        setEditUsername(false)
        setTimeout(() => {
          setAlert([])
        }, 6000);
    }
    async function editImage(e) {
        e.preventDefault();
        
          const Data = new FormData();
          Data.append("userImage", userImageRef.current.files[0]);
          const responce = await api.post(`/user/editImage/${user._id}`, Data);
          const alert=responce.data.data.alert
          const type=responce.data.data.type
          setAlert({alert,type})
          console.log(responce.data.data.user)
          if(responce.data.data.user) {
            setUser(responce.data.data.user)
            console.log(user)
          }
          setTimeout(() => {
            setAlert([])
          }, 6000);
      
    }

  
    return (

        <div className={`Profile ${seeProfile ? "show" : ""}`}>
            <div className={`alert ${alert.type}`}>
                <p>{alert.alert}</p>
            </div>
            <div className="header f-start"><div className="icon" onClick={hidProfile}><FaLongArrowAltLeft /></div> Profile</div>
            <div className="info scrollY">
                <div className="s-img center" onClick={clickImage}>
                    {user.picture ? <img src={user.picture} alt="" />: <FaUser />}
                    <div className="uploade-icon center"> <RiCameraLensFill /></div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={userImageRef}
                        style={{ display: "none" }}
                        onChange={editImage}
                    />
                        
                </div>
                <form onSubmit={editeProfile}>
                    
                    <h4>username:</h4>
                    <div className={`input-box f-start ${editUsername ? "active" : ""}`}>
                        <input type="text" defaultValue={user.name} ref={usernameRef} autoFocus={editUsername }/>
                        <div className="input-icon" >{editUsername ? <FaCheck onClick={editeProfile} /> : <FaPencilAlt onClick={() => { setEditUsername(true) }} />}</div>
                    </div>
            
                </form>
                
            </div>
        </div>
    )
}
