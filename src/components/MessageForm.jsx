import React, { useRef } from "react";
import { FiSmile } from "react-icons/fi";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { AiTwotoneFileText } from "react-icons/ai";
import { IoHeadset, IoImageSharp } from "react-icons/io5";
import api from "../api/local";
import Picker from "emoji-picker-react";
export default function MessageForm({ id, isRome, show }) {
  console.log(id);
  function showIcons() {
    document.querySelector(".icons-list").classList.toggle("show");
  }
  const messRef = useRef();
  const imageRef = useRef();
  const fileRef = useRef();
  const audioRef = useRef();

  const pikerStyle = {
    width: "100%",
    background: "var(--header-bg)",
    border: "none",
    boxShadow: "none",
    borderRadius: "0",
    padding: "0 15px 0 0",
  };
  async function sentMessage(e) {
    e.preventDefault();
    const Data = {
      file: "",
      mess: messRef.current.value,
      isRome,
      type: "string",
    };
    console.log(Data);
    await api.post(`/message/new/${id}`, Data);
    messRef.current.value = "";
  }
  async function sentficher(e) {
    e.preventDefault();
    let type = null;
    let mes = null;
    if (imageRef.current.files[0]) {
      mes = imageRef.current.files[0];
      type = "image";
    } else if (fileRef.current.files[0]) {
      mes = fileRef.current.files[0];
      type = "file";
    } else if (audioRef.current.files[0]) {
      mes = audioRef.current.files[0];
      type = "audio";
    }
    const Data = new FormData();
    Data.append("mess", "");
    Data.append("isRome", isRome);
    Data.append("type", type);
    Data.append("file", mes);
    console.log(Data);
    await api.post(`/message/new/${id}`, Data);
    messRef.current.value = "";
    imageRef.current.value = "";
    fileRef.current.value = "";
    audioRef.current.value = "";
  }
  function showEmojis() {
    document.querySelector(".body-container").classList.toggle("showemojis");
  }

  const onEmojiClick = (event, emojiObject) => {
    messRef.current.value += emojiObject.emoji + " ";
  };

  return (
    <div className={`footer rome-cont ${show}`}>
      <div>
        <Picker onEmojiClick={onEmojiClick} pickerStyle={pikerStyle} />

        <div className="center header">
          <div className="icon smile" id="emojis" onClick={showEmojis}>
            <FiSmile />
          </div>
          <div className="icons">
            <div className="icon" id="attchment" onClick={showIcons}>
              <IoIosAttach />
            </div>
            <div className="icons-list">
              <div
                className="icon center"
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                <IoImageSharp />
              </div>
              <div
                className="icon center "
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <AiTwotoneFileText />{" "}
              </div>
              <div
                className="icon center"
                onClick={() => {
                  audioRef.current.click();
                }}
              >
                <IoHeadset />
              </div>
            </div>
          </div>
          <form className="sentForm center" onSubmit={sentMessage}>
            <textarea
              placeholder="Tapez un message"
              row="1"
              ref={messRef}
            ></textarea>

            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              style={{ display: "none" }}
              onChange={sentficher}
            />
            <input
              type="file"
              accept="file/*"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={sentficher}
            />
            <input
              type="file"
              accept="audio/*"
              ref={audioRef}
              style={{ display: "none" }}
              onChange={sentficher}
            />
            <button type="submit" className="icon">
              <IoMdSend />
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}
