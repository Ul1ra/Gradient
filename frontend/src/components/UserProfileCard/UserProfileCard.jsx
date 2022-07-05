// import './styles.css';
import '../../Styles/UserProfileCard/UserProfileCard.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const UserProfileCard = (props) => {

    const selector = reduxState => reduxState.profilePageReducer;
    const reduxState = useSelector(selector);

    const userData = reduxState.userData;
    console.log(' user data ', userData);

    return(
        <div className='card-container'>
            <div className='left-container'>
                <img className='user-img' src={userData.avatar} alt='userImg'></img>
                <h3>{userData.first_name + ' ' + userData.last_name}</h3>
                <p>{userData.location}</p>
                <Link className='link' to='/editprofile'><button className='left-button'>Edit Profile</button> </Link>
            </div>
            <div className='right-container'>
                <div className='right-up'>
                    <div className='right-up-up'>
                        <div className='about-container'>
                            <p>About</p>
                            <p>{userData.about_me}</p>
                        </div>
                        <div className='liked-things-container'>
                            <p>Things I Like</p>
                            <div className='user-likes-container'>
                                {userData.things_user_likes.map((element,index) => {
                                    return(
                                        <div className='user-likes' key={index}>{element}</div> 
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='right-up-down'>
                        <div className='email-container'>
                            <p>Email</p>
                            <p>{userData.email}</p>
                        </div>
                        <div className='phone-container'>
                            <p>Phone</p>
                            <p>111-2234-5322</p>
                        </div>
                    </div>
                </div>
                <div className='right-down'>
                    <div className='user-stats'>
                        <h1>{userData.amount_of_posts}</h1>
                        <p>Posts</p>
                    </div>
                    <div className='user-stats'>
                        <h1>{userData.amount_of_likes}</h1>
                        <p>Likes</p>
                    </div>
                    <div className='user-stats'>
                        <h1>{userData.amount_of_friends}</h1>
                        <p>Friends</p>
                    </div>
                    <div className='user-stats'>
                        <h1>{userData.amount_of_followers}</h1>
                        <p>Followers</p>
                    </div>
                    <div className='user-stats'>
                        <h1>{userData.amount_following}</h1>
                        <p>Following</p>
                    </div>

                </div>
            </div>
        </div> 
    )
}

export default UserProfileCard;