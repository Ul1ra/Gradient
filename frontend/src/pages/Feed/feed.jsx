//Kat -- Feed Page - gets most recent posts using the Post component. Created a temporary login link for testing with hardcoded credentials. Includes a modal for new posts where one can make a post with text and image

import { useState, useEffect } from 'react'
import {fetchAndDispatchToken} from "../../store/actions/actions"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import Post from '../../components/Post/post'
import './styles.css';
import { dispatchPost } from '../../store/actions/postactions';
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/searchBar.jsx'



const Feed = () => {
  
  const selector = reduxState => reduxState.userReducer;
  const reduxState = useSelector(selector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = reduxState.user;
  console.log(userData);
  
  //Temporary login for testing

  const [email, setEmail] = useState("kattesteremail1@gmail.com");
  const [password, setPassword] = useState("test123");
  const [activeUserProfile, setActiveUserProfile] = useState({});


  // const loginClickHandler = () => {
  //   dispatch((dispatch, getState) => fetchAndDispatchToken(dispatch, getState, email, password, navigate));
  // }

  //Temporary login for testing

  useEffect(() => {
    dispatch((dispatch, getState) => fetchAndDispatchToken(dispatch, getState, email, password, navigate));


    // const url = 'https://motion.propulsion-home.ch/backend/api/users/me/';
    // const method = 'GET';
    // const headers = new Headers({'Authorization':`Bearer ${localStorage.getItem('token')}`});

    // const config = {method,headers};
    // fetch(url,config)
    //   .then(response => response.json())
    //   .then(data => {
    //     setName(`${data.first_name} ${data.last_name}`)
    //     setActiveUserProfile(data);
    //     dispatch({
    //       type: 'saveUserData',
    //       payload: data
    //   })
    //   });
    

  },
    []);

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState();

  const [imagesPreview, setImagesPreview] = useState('');
  //const [shared, setShared] = useState('');
  
  const handleUpload = (e) => {
      
    const imageUrl = e.target.files;
    const imageUrls = URL.createObjectURL(imageUrl[0])
    
    // setImages(imageUrls);
    setImages(imageUrl);
    setImagesPreview(imageUrls);
    console.log(images);
   
  }

  const newPostClickHandler = () => {
    dispatch((dispatch, getState) => dispatchPost(dispatch, getState, content, images));
    window.location.reload(false);
  }

  //toggle for form modal
  const [visibility, setVisibility] = useState(false);

    // modal that shows up once visibility is set to true to complete the new post form

  const inputWindow = 
  <div className="modal-container">
    <section className="modal">
      <div className='buttonSection'>
        <img className="closeButton" src="../close.png" alt="close" onClick={() => setVisibility(false)}/>
      </div>
      
      {/* new post form */}
      
        <div className='inputSection'>

          <div className='avatar-text-input'>
          <img className="userAvatar" src={userData.avatar} alt="userAvatar" /> 
            
          {/* text content */}
          <input className="myInputs" type="text" placeholder={content} value={content} onChange={e => setContent(e.target.value)}></input>
          </div>
          {/* image */}
          {imagesPreview ? <img src={imagesPreview} key={imagesPreview} width="200" alt="image" /> : null}

            <input multiple className="myImage" type="file" value={name} accept="image/*" onChange={handleUpload}>
            </input>
            
          {/* preview of images by mapping through chosen images */}
          {/* {images.map((image) => {
            return <img src={image} key={image} width="200" alt="image"/>
          })} */}
            
          
  
          </div>
        {/* <button onClick={newPostClickHandler}>Submit</button> */}
        <div className='bottom'>
        <div className='submit-button-container' onClick={newPostClickHandler} >
          <img className="submitButton" src="../Oval.png" alt="submit-button" />
            <img className="submitShape" src="../Shape.png" alt="submit-shape" />
            </div>
      </div> 
    </section>
    </div>
  
       
  return (
    <div>
      <NavBar />
      <SearchBar />
      {/* Temporary login for testing */}
      {/* <button onClick={loginClickHandler}>Login</button> */}
     
      {visibility ? inputWindow : null}

      <ul className="allposts-container">

        <li className="small-input-container" onClick={() => setVisibility(true)}>
          <div className='avatar-input'>
          <img className="userAvatar" src={userData.avatar} alt="userAvatar" /> 
          
          <input className="myInputs" type="text" placeholder={`What\'s on your mind, ${userData.first_name}?`} value={content} onChange={e => setContent(e.target.value)}>
          </input>
          </div>
          <div className='submit-button-container'>
            <img className="submitButton" src="../Oval.png" alt="submit-button" onClick={() => setVisibility(true)} />
            <img className="submitShape" src="../Shape.png" alt="submit-shape"/>
          </div>
        </li>
        <Post numberOfPosts="20" liked/>
    </ul>
  </div>
  )
}

export default Feed;
