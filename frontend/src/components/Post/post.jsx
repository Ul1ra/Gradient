// Kat - created this function to get all posts by getting the data from the API (25 posts), storing the data in the redux state in the postreducer, and render them as an unordered list using a map function iterating through the redux store.

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndDispatchPosts, dispatchLiked } from '../../store/actions/postactions';
import './styles.css';
import Moment from 'moment';

function Post(props) {
  

  const selector = reduxState => reduxState.currentPosts.posts;
  const reduxState = useSelector(selector);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  //NICO -- Kat, I added this props to the Post component so that we can select how many posts we want!!
  const allItems = reduxState.slice(0, props.numberOfPosts);
  
  console.log(allItems);

  //   const clickHandler = () => {
  //     dispatch((dispatch,getState)=>dispatchPost(dispatch,getState,newPost,navigate));
  // }

  //

  useEffect(() => {
    dispatch((dispatch, getState) => fetchAndDispatchPosts(dispatch, getState));
  },
    []);
  
  
  //toggle for post modal
  const [postVisibility, setPostVisibility] = useState(false);

  
  const handleLike = (e) => {
    const likedid = e.target.alt;
    const likedcontent = e.target.value;
    dispatch((dispatch, getState) => dispatchLiked(dispatch, getState, likedid, likedcontent));  
  }

  const postWindow = 
  <div className="modal-container">
    <section className="modal">
      <div className='buttonSection'>
        <img className="closeButton" src="../close.png" alt="close" onClick={() => setPostVisibility(false)}/>
      </div>
      
      {/* new post form */}
      
        
    </section>
    </div>


  return (
    <>
    {allItems.map((postItem, index) =>
      <li className="container" key={postItem.id}>
        <div>
          <div className='top-container'>
            <div className='avatar-name-time'>
              <div className='avatar-container'>
                
                {/* {postItem.user.avatar ? postItem.user.avatar : postItem.user.first_name.substring(0, 1)} */}
                
                {postItem.user.avatar ?
                  <img className='avatar' src={postItem.user.avatar} key={postItem.user.avatar} alt={postItem.user.avatar} />
                  : postItem.user.first_name.substring(0, 1)}
              </div>
            
              <div className='name-time'>
                <div className='full-name'>
                  <p>{postItem.user.first_name}</p>
                  <p>{postItem.user.last_name} </p>
                </div>
                <p className='time'>
                {Moment().format('DD/MM/YY') === Moment(postItem.created).format('DD/MM/YY') ?
           Moment().format('HH') === Moment(postItem.created).format('HH') ? 'Just now' :
              (Moment().format('HH') - Moment(postItem.created).format('HH'))+'h ago' : Moment(postItem.created).format('MMMM DD')}
                </p>
              </div>
            </div>
            <div className='ellipsis-button' onClick={() => setPostVisibility(true)}>
              <img className='ellipsis-image' src="../ellipsis-v-solid.svg" />
            
            </div>
          </div>
          <div className='content'>
            <p>{postItem.content}
            </p>
          </div>
          <div className='image-container'>
          {postItem.images.map((imageItem) => 
            <img className="postImage" src={imageItem.image} alt={imageItem.id} key={imageItem.id} />
          )}
          </div>
              
      

              
            
          <div className='social-buttons'>
            <div className='soc-button'>
              <div className='heart-arrow-button'>
                <div className="heart-button-container">

                <img className="hearty" src="../heart-solid.svg" alt={postItem.id} value={postItem.content} onClick={(e) => handleLike(e)} key={postItem.id} 
                  />

              
                </div>
                <p>Like</p>
              </div>

            
              <div className='heart-arrow-button'>
                
                <img className="arrow-button" src="../arrow.png" alt={postItem.id}
              // onClick={(e) => dispatch({ type: "addItem", payload: (e.target.alt) })}
              /><p>Share</p>
              </div>
            </div>
            
            <div className='likes'>
              <p>{postItem.amount_of_likes + ' likes'}</p>
            </div>
              
          </div>
        </div>
        {postVisibility ? postWindow : null}
      </li>
    )} 
    </>

)
}


export default Post;