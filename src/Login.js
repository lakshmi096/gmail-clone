import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import NewGmailLogo from "./assets/logo_gmail_lockup_dark.png"
import { auth, provider } from './config/firebase'
import { login } from './features/authSlice'
import "./Login.css"

const Login = () => {
    const dispatch = useDispatch();
    const loginUser = async () => {
        const {user} = await auth.signInWithPopup(provider).catch(error => alert(error.message))
        dispatch(
            login({
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
            })
        )
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={NewGmailLogo} alt="login to gmail clone"/>
                <Button variant="contained" color="primary" onClick={loginUser}>Login With Gmail</Button>
            </div>
        </div>
    )
}

export default Login
