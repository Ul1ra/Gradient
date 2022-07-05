//Kat -- Find Friends - gets 6 random users 

import { useState, useEffect } from 'react'
import {fetchAndDispatchToken} from "../../store/actions/actions"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import Post from '../../components/Post/post'
import { fetchFriends } from '../../store/actions/findfriendsactions';
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/searchBar.jsx';
import './styles.css';

const FindFriends = () => {

  const selector = reduxState => reduxState.findFriendsReducer.users;
  const reduxState = useSelector(selector);
  const dispatch = useDispatch();

  const allFriends = reduxState.slice(0,20);

  console.log(allFriends);

  useEffect(() => {
    dispatch((dispatch, getState) => fetchFriends(dispatch, getState));
  },
    []);

  return (
    <div className='mainContainer'>
      <NavBar />
      <div className='allfriends-container'>
      {allFriends.map((friend, index) =>
        
        <li className='friend-container' key={friend.id}>

          <div className='friend-avatar-container'>
          
            {friend.avatar ?
                  <img className='friend-avatar' src={friend.avatar} key={friend.avatar} alt={friend.avatar} />
              : friend.first_name.substring(0, 1)}
            
          </div>
          <div className='full-name'>
                  <p>{friend.first_name}</p>
                  <p>{friend.last_name} </p>
          </div>
          
          <div className='follow-addfriend-buttons'>
            <div className='button-button'><p>FOLLOW</p></div>
            <div className='button-button'><p>ADDFRIEND</p></div>       
          </div>
          
       </li>
      
      
      )}
     
     </div>
    </div>
  )
}

export default FindFriends;