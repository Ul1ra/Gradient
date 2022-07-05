
import favicon from '../../assets/saved/images/favicon.png';
import { Link } from 'react-router-dom';
import './styles.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const SearchBar = () => {

  const selector = reduxState => reduxState.currentPosts.posts;
  const reduxState = useSelector(selector);
  const dispatch = useDispatch();

  const [target, setTarget] = useState('');

  const searchPosts = () => {
    console.log(target);
  }
    
  return (
    <div className='search-bar'>
      <div className='left-container-search'>
        <div className='left-search-posts'>
          <div className='search-icon'>
            <img className='search-icon-image' src='../search.png'/>
          </div>
          <div className='searchbar'>
            <input className='inputbar' type="text" placeholder='Search posts...' onChange={e => setTarget(e.target.value)}></input>
            {/* <button onClick={searchPosts}>search</button> */}
          </div>
        </div>
      </div>

      <div className='right-container-links'>
      <div className='right-liked-friends-follow'>
        <div className='left-links'><p>Liked</p>
        </div>

        <div className='left-links'><p>Friends</p>
        </div>
        <div className='left-links'><p>Follow</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SearchBar;