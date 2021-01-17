import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import "./Mail.css"
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArchiveIcon from '@material-ui/icons/Archive';
import ReportIcon from '@material-ui/icons/Report';
import DeleteIcon from '@material-ui/icons/Delete';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import LabelIcon from '@material-ui/icons/Label';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PrintIcon from '@material-ui/icons/Print';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Avatar, IconButton } from '@material-ui/core';
import { Reply} from '@material-ui/icons';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpenedMail, setOpenedMail } from './features/mailSlice';
import { db } from './config/firebase';

const Mail = () => {
    const [{mailId}] = useState(useParams())
    const history = useHistory();
    const openedMail = useSelector(selectOpenedMail);
    const dispatch = useDispatch()

    useEffect(() => {
        const loadOpenedMail = async () => {
            if(!openedMail){
                const mailRef = db.collection('emails').doc(mailId);
                const doc = await mailRef.get();
                if (!doc.exists) {
                    history.push(`/`);
                } else {
                    const mailById = doc.data();
                    mailById.id = doc.id;
                    mailById.timestamp = `${new Date(mailById.timestamp.seconds*1000).toDateString()}`
                    dispatch(setOpenedMail(mailById))
                }
            }
        }
        loadOpenedMail()
    }, [mailId, openedMail, dispatch, history]);

    const backToMails = () => {
        history.push(`/`);
    }

    const markMailStarred = async () => {
        const emailRef = db.collection('emails').doc(openedMail.id);
        await emailRef.update({
            'starred': !openedMail.starred
        });
        dispatch(setOpenedMail({...openedMail, 'starred': !openedMail.starred }))
    }

    const markMailImportant = async () => {
        const emailRef = db.collection('emails').doc(openedMail.id);
        await emailRef.update({
            'important': !openedMail.important
        });
        dispatch(setOpenedMail({...openedMail, 'important': !openedMail.important }))
    }

    return (
        <div className="mail">
            <div className="mail__tools">
                <div className="mail__toolsLeft">
                    <IconButton onClick={backToMails}>
                        <ArrowBackOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <ArchiveIcon/>
                    </IconButton>
                    <IconButton>
                        <ReportIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton>
                        <MarkunreadIcon/>
                    </IconButton>
                    <IconButton>
                        <AccessAlarmIcon/>
                    </IconButton>
                    <IconButton>
                        <MoveToInboxIcon/>
                    </IconButton>
                    <IconButton>
                        <LabelIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
                <div className="mail__toolsRight">
                    <IconButton>
                        <ChevronLeftIcon/>
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon/>
                    </IconButton>
                    <IconButton>
                        <PrintIcon/>
                    </IconButton>
                    <IconButton>
                        <OpenInNewIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="mail__body">
                <div className="mail__bodyHeader">
                    <h2>{openedMail?.subject}</h2>
                    <IconButton onClick={markMailImportant} title="mark important">
                        { openedMail?.important ? 
                            <LabelImportantIcon className="important"/> : 
                            <LabelOutlinedIcon/>
                        }
                    </IconButton>
                    
                </div>
                <div className="mail__bodyTitle">
                    <div className="mail__bodyTitleLeft">
                        <Avatar/>
                        <p className="mail__bodySenderInfo">{openedMail?.from}
                            <span className="mail__bodySenderMail">&lt;{openedMail?.fromMail}&gt;</span>
                            <span className="mail__bodyReceipientMail"> to {openedMail?.to}</span>
                        </p>
                    </div>
                    <div className="mail__bodyTitleRight">
                        <p className="mail__bodyTime">{openedMail?.timestamp}</p>
                        <IconButton onClick={markMailStarred} title="mark starred">
                            {openedMail?.starred ? <StarIcon className="starred"/> : <StarOutlineIcon/>}
                        </IconButton>
                        <IconButton>
                            <Reply/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="mail__bodyMessage">
                    {openedMail?.message}
                </div>
            </div>
        </div>
    )
}

export default Mail;
