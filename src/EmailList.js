import React, {useState, useEffect} from 'react';
import "./EmailList.css"
import {Button, Checkbox, IconButton} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';
import { db } from './config/firebase';
import {DummyMails} from "./dummy-mail";
import firebase from "firebase";
import { useDispatch, useSelector } from 'react-redux';
import { selectMailType, setMailType, setTotalMailCount } from './features/mailSlice';
import { selectUser } from './features/authSlice';

const EmailList = () => {
    const user = useSelector(selectUser)
    const [mails, setMails] = useState([]);
    const [activeSection, setActiveSection] = useState("primary");
    const mailType = useSelector(selectMailType);
    const dispatch = useDispatch()

    useEffect(() => {
        db.collection("emails")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setMails(
                    snapshot.docs.map((doc) => {
                        const data = doc.data();
                        data.id = doc.id;
                        const firebaseTimeStamp = new Date(doc.data().timestamp.seconds*1000);
                        data.timestamp = `${firebaseTimeStamp.toDateString()}`
                        if(data?.to === user?.email || data?.fromMail === user?.email) {
                            return data
                        }
                    }).filter(doc => doc)
                )
                dispatch(setTotalMailCount(countUnreadMailsBySection("primary")))
            })
            
        return () => {
            setMails([]);
        };
    },[dispatch, user])


    const countUnreadMailsBySection = (section) => {
        return mails.filter(mail => mail && mail[section] && !mail.read).length;        
    }

    const handleSetSection = (activeSection) => {
        setActiveSection(activeSection);
        dispatch(setMailType(activeSection))
    }

    const receiveDummyMail = () => {
        const randomNumber = Math.floor(Math.random() * (2 - 0 + 2)) + 0;
        const randomMail = DummyMails[randomNumber];
        db.collection("emails").add({
            ...randomMail,
            to: user.email,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        });
    }

    const emails = mails.length === 0 ? (
        <h5 className="no-email">No mails to show. Please click on RECEIVE DUMMY MAIL for demo</h5>
    ) : (
        mails.filter(map => map).map(mail => {
            if(mail && mail[mailType]) {
                return (
                    <EmailRow
                        key = {mail.id}
                        email = {mail}
                    />
                );
            }
        })
    )



    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <Checkbox/>
                    <IconButton>
                        <ArrowDropDownIcon/>
                    </IconButton>
                    <IconButton>
                        <RefreshIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    <Button variant="contained" color="primary" disableElevation={false} size="small" onClick={receiveDummyMail}>
                        Receive Dummy Mail
                    </Button>
                </div>

                <div className="emailList__settingsRight">
                    <IconButton>
                        <ChevronLeftIcon/>
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="emailList__sections">
                <Section 
                    Icon={InboxIcon} 
                    title="primary" 
                    color="#c04b37" 
                    selected={activeSection === "primary"} 
                    handleSetSection={handleSetSection} 
                    unread={countUnreadMailsBySection}
                />
                <Section 
                    Icon={PeopleIcon} 
                    title="social" 
                    color="blue" 
                    selected={activeSection === "social"} 
                    handleSetSection={handleSetSection}
                    unread={countUnreadMailsBySection}
                />
                <Section 
                    Icon={LocalOfferIcon} 
                    title="promotions" 
                    color="green" 
                    selected={activeSection === "promotions"} 
                    handleSetSection={handleSetSection}
                    unread={countUnreadMailsBySection}
                />
            </div>
            <div className="emailList__list">
                {emails}
            </div>
        </div>
    )
}

export default EmailList
