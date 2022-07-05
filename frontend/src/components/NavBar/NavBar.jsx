import '../../Styles/NavBar/NavBar.css'
import favicon from '../../assets/saved/images/favicon.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import postLogo from '../../assets/saved/svgs/posts_logo.svg';

const NavBar = () => {

    const selector = reduxState => reduxState.profilePageReducer;
    const reduxState = useSelector(selector);
    const userData = reduxState.userData;

    return(

        <div className="nav-bar">
            <div className='left'>
                <div className='logo-container'>
                    <img src={favicon} alt='no-img'></img>
                    <h2>Motion</h2>
                </div>
                <div className='navposts-container'>
                    <img src={postLogo}></img>
                    <Link className='link' to='/feed' ><h3>Posts</h3></Link>
                </div>
                <div className='friends-container'>
                    <img src={postLogo}></img>
                    <Link className='link' to='/findfriends' ><h3>Find Friends</h3></Link>
                </div>
            </div>
            <div className='right'>
                <h3>{userData.first_name + ' ' + userData.last_name}</h3>
                <Link to='/profile'><img src={userData.avatar} alt='none'></img></Link>
                <Link className='link-logout' to='/'><h4>Log out</h4></Link>
            </div>
        </div>
    )

}

export default NavBar;