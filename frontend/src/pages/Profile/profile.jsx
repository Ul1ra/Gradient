import './profile.css'
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import Post from '../../components/Post/post';

const Profile = () => {

  //GLOBAL STATE
  const selector = reduxState => reduxState.profilePageReducer;
  const state = useSelector(selector)
  const dispatch = useDispatch();
  

  //LOCAL STATE
  const [name,setName] = useState('');
  const [activeUserProfile, setActiveUserProfile] = useState({});
  // const activeUserProfile = state.userData;


  //COMPONENT DID MOUNT - TOKEN IS FETCHED FROM LOCAL STORAGE AND USED TO GET USER INFO
  useEffect(() => {

    const url = 'https://motion.propulsion-home.ch/backend/api/users/me/';
    const method = 'GET';
    const headers = new Headers({'Authorization':`Bearer ${localStorage.getItem('token')}`});

    const config = {method,headers};
    fetch(url,config)
      .then(response => response.json())
      .then(data => {
        setName(`${data.first_name} ${data.last_name}`)
        setActiveUserProfile(data);
        dispatch({
          type: 'saveUserData',
          payload: data
      })
      });
    }, []);

  return (
    <>
      {/* <header> Default Header (will wait for Fedor's version</header> */}
      <NavBar />
      <div className='content-container'>
        <div className='smoke'></div>
        <div className='card-and-posts'>
          <UserProfileCard nameprop={name} />
          <div className="posts-container">
            <Post numberOfPosts={10} />
          </div>
        </div>

      </div>
    </>

  )
  
}

export default Profile;