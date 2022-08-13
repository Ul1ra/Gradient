import { useState } from 'react'
import { fetchAndDispatchToken } from '../../store/actions/actions'
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import './Styles/main.css'
import avatarSVG from '../../assets/saved/svgs/avatar.svg';
import passwordSVG from '../../assets/saved/svgs/password.svg';
import twitterIcon from '../../assets/saved/svgs/twitter_icon.svg';
import facebookIcon from '../../assets/saved/svgs/facebook_icon.svg';
import instaIcon from '../../assets/saved/svgs/instagram_icon.svg';
import gradientLogo from '../../assets/saved/images/logo_white.png'
import googleBtn from '../../assets/saved/svgs/google.svg';
import appleBtn from '../../assets/saved/svgs/apple.svg';


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("kattesteremail1@gmail.com");
  const [password, setPassword] = useState("test123");


  const loginClickHandler = () => {
    dispatch((dispatch, getState) => fetchAndDispatchToken(dispatch, getState, email, password, navigate));
  }

  return (
    
    <main>
        <div class="left-container">
            <div class="left-top">
                <div class="logo-gradient">
                    <img src={gradientLogo} alt="gradient-logo" />
                    {/* <button onClick={loginClickHandler}>Login</button> */}
                    <h1>gradient</h1>
                </div>
                <p>
                    Connect with friends and the world around you with gradient.
                </p>
                <div class="buttons">
                    <button class="apple-store-btn">
                        <object data={appleBtn} width="80" height="80"></object>
                    </button>
                    <button class="google-store-btn">
                        <object data={googleBtn} width="80" height="80"></object>
                    </button>
                </div>
            </div>
            <div class="left-bottom">
                <div class="icons">
                    <img src={twitterIcon} alt="" />
                    <img src={facebookIcon} alt="" />
                    <img src={instaIcon} alt="" />
                </div>
                <p>@gradient 2018. All rights reserved</p>
            </div>
            
        </div>
        <div class="right-container">
            <div class="sign-in">
                <p>Don't have an account?</p>
                <button class="signup-button">SIGN UP</button>
            </div>
            <div class="user-data">
                <h1>Sign In</h1>
                <div class="input-block">
                    <div class="input">
                        <object data={avatarSVG} width="20px" height="20px"></object>
                        <p>Username</p>
                    </div>
                    <div class="input">
                        <object data={passwordSVG} width="20px" height="20px"></object>
                        <p>Username</p>
                    </div>
                </div>
            </div>
            <div class="login-button-container">
                <button class="signin-button" onClick={loginClickHandler}>SIGN IN</button>
            </div>
        </div>


    </main>

  )
}

export default SignIn;