import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uploadAvatar } from "../../store/actions/profileactions";
import './styles.css';

const ImageUpload = () => {

    const dispatch = useDispatch();

    let [imagePreview,setImage] = useState(undefined)
    let [blob,setBlob] = useState(undefined)

    const handleUpload = (event) => {
        const newImage = event.target.files[0];
        const imgBlob = URL.createObjectURL(newImage);
        setImage(newImage);
        
        dispatch({type:'setNewAvatar', payload: imgBlob});

    }

    const handleSubmit = () => {
        console.log('clicked')

        const url = 'http://127.0.0.1:8000/backend/api/users/me/'
        // const url = 'https://gradient.propulsion-home.ch/backend/api/users/me/';
        const token = localStorage.getItem("token"); 
      
        const formData = new FormData()
        formData.append('avatar', imagePreview)
        
        console.log(formData)
         const config = {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,                      
        };
        fetch(url,config)
        .then (response => response.json())
        .then(data => {
          console.log(data);
        })
    }

    
    return(
        <>
            <div className="upload-container">
                <input type='file' onChange={handleUpload}></input>
                <button className="button" onClick={handleSubmit}>Upload</button>
                {/* <img src={imagePreview} alt='userImg'></img> */}
            </div>
        </>
    )
}

export default ImageUpload;