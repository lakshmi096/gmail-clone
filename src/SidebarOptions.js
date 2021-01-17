import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsSidebarOpen } from './features/appSlice';
import "./SidebarOptions.css"

const SidebarOptions = ({Icon, title, number, selected, handleActiveSelection}) => {
    const sideBarOpen = useSelector(selectIsSidebarOpen)
    return (
        <div 
            className={`${sideBarOpen ? "sidebarOptions" : "sidebarOptions--collapse"} ${selected && "sidebarOptions--active"}`}
            onClick = {() => handleActiveSelection(title)}>
                <Icon/>
                {sideBarOpen && <h3>{title}</h3>}
                {sideBarOpen && <p>{number}</p>}
        </div>
    )
}

export default SidebarOptions
