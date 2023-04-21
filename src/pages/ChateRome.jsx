import React, { useState, useEffect } from "react";
import "./chaterome.css";
import SideBar from "../components/SideBar";
import Rome from "../components/Rome";

import GroupRome from "../components/GroupRome";
import MessageForm from "../components/MessageForm";
import Pusher from "pusher-js";
export default function ChateRome() {
  const [allmessages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [rome, setRome] = useState(null);
  const [groupData, setGroupData] = useState(null);
  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_key, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function(data) {
      const romeId = data.messages[0].rome;
      const sender = data.messages[0].sender;
      
      if (rome && rome.id === romeId) {
        alert("open roome")
        setMessages([...allmessages, data]);
      } else if(groupData && groupData.group.id === romeId){
        alert("open groub")
        setMessages([...allmessages, data]);
      } else if(data.messages[0].fromFriend && document.getElementById(sender._id)) {
        alert(" roome")
          const cont=document.getElementById(sender._id)
          const messUC = cont.querySelector(".mess-count");
          messUC.innerHTML = parseInt(messUC.textContent) + 1;
          messUC.classList.remove("hide");
      } else if(data.messages[0].fromFriend === false && document.getElementById(romeId) ) {
        alert("group")
          const cont=document.getElementById(romeId)
          const messUC = cont.querySelector(".mess-count");
          messUC.innerHTML = parseInt(messUC.textContent) + 1;
          messUC.classList.remove("hide");
      }
       else if(data.messages[0].fromFriend) {
        setUsers([...users, sender]);
      }
      
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [allmessages]);
  

  function setnull() {
    setRome(null);
    setGroupData(null);
  }
  let chaterome = null;
  let id = null;
  let isRome = "true";
  if (rome) {
    chaterome = (
      <Rome rome={rome} allmessages={allmessages} setnull={setnull} />
    );
    id = rome.id;
    isRome = "true";
  } else if (groupData) {
    chaterome = (
      <GroupRome
        groupData={groupData}
        allmessages={allmessages}
        setnull={setnull}
      />
    );
    id = groupData.group.id;
    isRome = "false";
  }
  return (
    <div className={`body-container ${chaterome ? "scroll" : ""}`}>
      <SideBar
        users={users}
        setUsers={setUsers}
        setRome={setRome}
        setGroupData={setGroupData}
        setMessages={setMessages}
      />

      <div>
        {chaterome ? (
          chaterome
        ) : (
          <div className="no-rome center">
            <div>
              <img src="/New team members-pana.svg" alt="" />
              <h3>Close Rome</h3>
              <p>
                Enjoy fast, simple and secure communication that's free*, and
                available anywhere in the world.
              </p>
            </div>
          </div>
        )}
        <MessageForm id={id} isRome={isRome} show={chaterome ? "show" : ""} />
      </div>
    </div>
  );
}
