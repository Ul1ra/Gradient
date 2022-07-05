import '../profile.css'
import EditProfileCard from '../../../components/EditProfileCard/EditProfileCard';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getState } from 'redux';
import NavBar from '../../../components/NavBar/NavBar';


const EditProfile = () => {

  const selector = reduxState => reduxState.profilePageReducer.token;
  const token = useSelector(selector)

  // if(token) {
  //   console.log('logged in');
  // }

  const dispatch = useDispatch();
  
  const [email,setEmail] = useState('nicolasmarinw@gmail.com');
  const [password,setPassword] = useState('thunk');
  const [name,setName] = useState('');
  const [activeUserProfile, setActiveUserProfile] = useState({});




  useEffect(() => {
    console.log('element loaded');
    const url = 'https://motion.propulsion-home.ch/backend/api/auth/token/';
    const method = 'POST';
    const headers = new Headers({'Content-type':'application/json'});

    let body = {email,password};
    body = JSON.stringify(body);
    const config = {method,headers,body};

    fetch(url,config)
      .then(response => response.json())
      .then(data => 
        dispatch({
          type: 'setToken',
          payload: data.access
        })
      )
  }, [])

  const clickHandler = () => {
    const url = 'https://motion.propulsion-home.ch/backend/api/users/me/';
    const method = 'GET';
    const headers = new Headers({'Authorization':`Bearer ${token}`});

    const config = {method,headers};
    fetch(url,config)
      .then(response => response.json())
      .then(data => {
        setName(`${data.first_name} ${data.last_name}`)
        setActiveUserProfile(data);
      });

    
  }


  return (
    <>
      <NavBar />
      <div className='edit-content-container'>
        <div className='smoke'></div>
        <div className='edit-card-container'>
          <div className='edit-card'>
              <EditProfileCard nameprop={name} prophello='hello' userData={activeUserProfile} />
          </div>
        </div>

      </div>
    </>

  )
  
}

export default EditProfile;