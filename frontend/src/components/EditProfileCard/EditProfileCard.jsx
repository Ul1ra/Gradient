// import './styles.css';
import '../../Styles/EditProfileCard/EditProfileCard.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import ImageUpload from '../ImageUpload/ImageUpload';

/* How to use the component:
    - this component has several inputs, gathered directly from the user data
    - it accepts a user object as a props and gets these characteristics from the object 
*/


const EditProfileCard = (props) => {

    //Getting access to redux state --> retrieving user token from there
    const selector = reduxState => reduxState.profilePageReducer;
    const reduxState = useSelector(selector);
    const userData = reduxState.userData;


    // const token = reduxState.token;
    const localToken = localStorage.getItem('token');
    const dispatch = useDispatch();

    
    
    //Setting up local state
    const [localState,setNewState] = useState({...userData});
    

    const onChangeHandler = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        
        const newState = {...localState}
        newState[key] = value;
        setNewState(newState);
    }

    const likeClickHandler = () => {
        const newState = {...localState};
        newState.things_user_likes.push(localState.new_like)
        setNewState(newState);
    }

    const deleteClickHandler = (event) => {
        const like = event.target.value;
        const likesArr = localState.things_user_likes;
        likesArr.forEach((element, index) => {
            if(element === like){
                likesArr.splice(index,1);
            }
        })

        const newState = {...localState, "things_user_likes":likesArr};
        setNewState(newState);
    }

    const onClickHandler = () => {

        let url = 'https://motion.propulsion-home.ch/backend/api/users/me/'
        const method = 'PATCH';
        const headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json','Authorization':`Bearer ${localToken}`})

        let body = {
            'first_name': localState.first_name,
            'last_name': localState.last_name,
            'about_me': localState.about_me, 
            'location': localState.location, 
            'things_user_likes': localState.things_user_likes,
            // 'avatar': userData.avatar
        };

        body = JSON.stringify(body);
        const config = {method, headers, body};

        fetch(url,config)
        .then(response => response.json())


        let url2 = 'https://motion.propulsion-home.ch/backend/api/users/me/'
        const method2 = 'PATCH';
        const headers2 = new Headers({'Accept': 'application/json','Content-Type': 'application/json','Authorization':`Bearer ${localToken}`})

        let body2 = {
            'avatar': userData.avatar
        };

        body2 = JSON.stringify(body);
        const config2 = {method, headers, body};

        fetch(url2,config2)
        .then(response => response.json())

    }


    return(
        <div className='editcard-container'>
            <div className='left'>
                <div className='left-top'>
                    <img className='user-img' src={userData.avatar} alt='userImage'></img>
                    <button className='img-button'></button>
                    {/* <button className='img-button'>Remove Image</button> */}
                    <ImageUpload />
                </div>
                <div className='left-bot'>
                    <Link className='link' to='/profile'><button className='edit-button'>Cancel</button> </Link>
                    {/* <button className='edit-button'>DELETE ACCOUNT</button> */}
                    <Link className='link' to='/profile'><button className='edit-button' onClick={onClickHandler}>Save Changes</button> </Link>
                </div>
            </div>
            <div className='right'>
                <div className='right-upper'>
                    <div className='edit-profile-input'>
                        <p>First name</p>
                        <input type="text" name="first_name" id="first_name" value={localState.first_name} onChange={onChangeHandler} />
                    </div>
                    <div className='edit-profile-input'>
                        <p>Last name</p>
                        <input type="text" name="last_name" id="last_name" value={localState.last_name} onChange={onChangeHandler}/>
                    </div>
                    <div className='edit-profile-input'>
                        <p>Email</p>
                        <input className='fixed-item' type="text" name="email" id="email" value={userData.email}/>
                    </div>
                    <div className='edit-profile-input'>
                        <p>Username</p>
                        <input className='fixed-item' type="text" name="username" id="username" value={userData.username}/>
                    </div>
                    <div className='edit-profile-input'>
                        <p>Location</p>
                        <input type="text" name="location" id="location" value={localState.location} onChange={onChangeHandler} />
                    </div>
                    <div className='edit-profile-input'>
                        <p>Phone</p>
                        <input type="text" name="phone" id="phone" />
                    </div>
                    <div className='edit-profile-input'>
                        <p>About</p>
                        <textarea type="text" name="about_me" id="about_me" placeholder={localState.about_me} value={localState.about_me} onChange={onChangeHandler}/>
                    </div>
                    <div className='edit-profile-input'>
                        <p>Password</p>
                        <input type="text" name="password" id="password" placeholder='●●●●●●●●●'/>
                    </div>
                    
                </div>
                <div className='right-downer'>
                    <div className='liked-things-container'>
                        <div className='user-likes-container'>
                            {userData.things_user_likes.map((element,index) => {
                                return(
                                    <div className='user-likes' key={index}>
                                        <p className='like'>{element}</p>
                                        <button className='delete-like' value={element} onClick={deleteClickHandler}>x</button>
                                    </div> 
                                )
                            })}
                        </div>
                    </div>
                    <div className='add-new-like'>
                        <input className='new-like-input' type='text' name='new_like' placeholder='Add new like here' id='new_like' value={localState.new_like} onChange={onChangeHandler}></input>
                        <button className='new-like-button' onClick={likeClickHandler}>Add New Like</button>
                    </div>

                </div>
            </div>
        </div> 
    )
}

export default EditProfileCard;