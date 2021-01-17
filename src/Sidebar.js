import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import "./Sidebar.css"
import AddIcon from '@material-ui/icons/Add';
import SidebarOptions from './SidebarOptions';
import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import SendIcon from '@material-ui/icons/Send';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useDispatch, useSelector } from 'react-redux';
import { openComposeMail, selectTotalMailCount, setMailType } from './features/mailSlice';
import { selectIsSidebarOpen } from './features/appSlice';
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
    const [activeSidebarOption, setActiveSidebarOption] = useState("inbox")
    const dispatch = useDispatch();
    const sideBarOpen = useSelector(selectIsSidebarOpen)
    const totalMailCount = useSelector(selectTotalMailCount)
    const history = useHistory();

    const handleOpenComposeMail = () => {
        dispatch(openComposeMail());
    }
    const switchMailTypeFromSidebar = (type) => {
        dispatch(setMailType(type))
    }
    const isSelected = (option) => {
        return option === activeSidebarOption;
    }
    const handleActiveSelection = (option) => {
        if(option === 'new meeting') {
            openInNewTab('https://meet.google.com/')
        } else {
            history.push(`/`);
            setActiveSidebarOption(option)
            const type = option === 'inbox' ? 'primary' : option;
            switchMailTypeFromSidebar(type)
        }
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className={`${!sideBarOpen ? 'sidebar--collapse' : 'sidebar'}`}>
            <Button startIcon={<AddIcon fontSize="large"/>} className="sidebar__compose" onClick={handleOpenComposeMail}>
                {sideBarOpen && 'Compose'}
            </Button>
            <div className="sidebar__section">
                <SidebarOptions 
                    Icon={InboxIcon} 
                    title={sideBarOpen && "inbox"} 
                    number={sideBarOpen && totalMailCount} 
                    selected={isSelected("inbox")} 
                    handleActiveSelection = {handleActiveSelection}
                />
                <SidebarOptions 
                    Icon={StarIcon} 
                    title={sideBarOpen && "starred"} 
                    selected={isSelected("starred")} 
                    handleActiveSelection = {handleActiveSelection}
                />
                <SidebarOptions 
                    Icon={AccessAlarmIcon} 
                    title={sideBarOpen && "snoozed"}
                    selected={isSelected("snoozed")} 
                    handleActiveSelection = {handleActiveSelection}
                />
                <SidebarOptions 
                    Icon={LabelImportantIcon} 
                    title={sideBarOpen && "important"}
                    selected={isSelected("important")} 
                    handleActiveSelection = {handleActiveSelection}
                />
                <SidebarOptions 
                    Icon={SendIcon} 
                    title={sideBarOpen && "sent"}
                    selected={isSelected("sent")} 
                    handleActiveSelection = {handleActiveSelection}
                />
                <SidebarOptions 
                    Icon={DescriptionIcon} 
                    title={sideBarOpen && "drafts"}
                    selected={isSelected("drafts")} 
                    handleActiveSelection = {handleActiveSelection}
                />
                <SidebarOptions 
                    Icon={ExpandMoreIcon} 
                    title={sideBarOpen && "more"}
                />
            </div>

            <div className="sidebar__section">
                <p>Meet</p>
                <SidebarOptions Icon={VideocamIcon} title={sideBarOpen && "new meeting"} handleActiveSelection = {handleActiveSelection}/>
                {/* <SidebarOptions Icon={KeyboardIcon} title={sideBarOpen && "join a meeting"} handleActiveSelection = {handleActiveSelection}/> */}
            </div>
        </div>
    )
}

export default Sidebar
