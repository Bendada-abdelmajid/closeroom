import React , {useState, useRef} from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import api from "../api/local";
export default function CreateGroup({openGroupeForm,closeGroupeForm, groups , setGroups}) {
    const [image, setImage] = useState("");
    const [alert, setAlert] = useState([]);
    const imageRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
  function clickImage() {
    imageRef.current.click();
  }
  function cahngeImage() {
    const url = URL.createObjectURL(imageRef.current.files[0]);
    setImage(url);
  }
  async function createGroupe(e) {
    e.preventDefault();
    if(image.length > 0){
      const Data = new FormData();

      Data.append("title", titleRef.current.value);
      Data.append("description", descRef.current.value);
      Data.append("image", imageRef.current.files[0]);
  
    
      const responce = await api.post("/group/new", Data);
      const alert=responce.data.alert
      const type=responce.data.type
      setAlert({alert,type})
      console.log(responce.data)
      if(responce.data.group) {
        setGroups([...groups, responce.data.group])
      }
      setTimeout(() => {
        closeGroupeForm();
      }, 2000);
      
    } else {
      setAlert({
        type:"error",
        alert:"pleas uploade image"
      })
      setTimeout(() => {
        setAlert([])
      }, 2000);
    }
    
  }
  if (!openGroupeForm) return null;
  return (
    <>
    <div className="overlay"  onClick={closeGroupeForm} />
    <div className="popup">
    <div className={`alert ${alert.type}` } style={{borderRadius:"5px 5px 0 0" }}>
      <p>{alert.alert}</p>
    </div>
    <form className="group-form" onSubmit={createGroupe}>
    
      <h4 >Create Groupe</h4>
      <div className="s-img img-box" onClick={clickImage}>
            {image !== "" ? (
              <img src={image} alt="uploded... " />
            ) : (
              <div className="uploade-icon center">
                <FaCloudUploadAlt />
                <p>Upload Image</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              style={{ display: "none" }}
              onChange={cahngeImage}
            />
          </div>
      <div className="form-controll">
        <label htmlFor="title">Title :</label>
        <input type="text" id="title" ref={titleRef} required />
      </div>
      <div className="form-controll">
        <label htmlFor="description">Description :</label>
        <textarea  id="description" cols="6" rows="3" required ref={descRef}></textarea>
      </div>
    <button type="submit" className="btn" >
      Add
    </button>
  </form>
    </div>
    
    
  </>
  )
}
