import React from 'react';
import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import "./Header.css"
import logo from "./assets/gmail-logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/authSlice';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from './config/firebase';
import { toggleSidebarStatus } from './features/appSlice';

const Header = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const handleLogout = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    }

    const toggleSideBar = () => {
        dispatch(toggleSidebarStatus())
    }

    return (
        <div className="header">
            <div className="header__left">
                <IconButton onClick={toggleSideBar}>
                    <MenuIcon/>
                </IconButton>
                <img src={logo} alt="gmail logo" />
            </div>

            <div className="header__middle">
                <SearchIcon/>
                <input type="text" name="" id="" placeholder="Search mail"/>
                <ArrowDropDownIcon/>
            </div>

            <div className="header__right">
                <IconButton>
                    <AppsIcon/>
                </IconButton>
                <IconButton>
                    <NotificationsIcon/>
                </IconButton>
                <IconButton>
                    <SettingsIcon/>
                </IconButton>
                <IconButton>
                    <Avatar src={user?.photoUrl}/>
                </IconButton>
                <IconButton onClick={handleLogout}>
                    <ExitToAppIcon titleAccess="Logout"/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header


