import React from 'react';
import "./EmailRow.css";
import { Checkbox, IconButton } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openComposeMail, setDraft, setOpenedMail } from './features/mailSlice';
import { db } from './config/firebase';

const EmailRow = ({email}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const emailRef = db.collection('emails').doc(email.id);

    const handleOnClick = async() => {
        if(email.drafts) {
            dispatch(setDraft(email))
            dispatch(openComposeMail())
        } else {
            await emailRef.update({'read': true})
            dispatch(setOpenedMail(email))
            history.push(`/${email.id}`);
        }

    }

    const markMailStarred = async () => {
        await emailRef.update({
            'starred': !email.starred
        });
    }

    const markMailImportant = async () => {
        await emailRef.update({
            'important': !email.important
        });
    }

    return (
        <div className={`emailRow ${email.read ? 'emailRow--read' : '' }`}>
            <div className="emailRow__options">
                <Checkbox/>
                <IconButton onClick={markMailStarred}>
                    {email?.starred ? <StarIcon className="starred"/> : <StarOutlineIcon/>}
                </IconButton>
                <IconButton onClick={markMailImportant}>
                    {email?.important ? <LabelImportantIcon className="important"/> : <LabelOutlinedIcon/>}
                </IconButton>
            </div>
            <p className="emailRow__sender" onClick={handleOnClick}> {email.from} </p>
            <div className="emailRow__message" onClick={handleOnClick}>
                <p>
                    {email.subject}
                    
                    <span className="emailRow__description">
                        {`- ${email.message}`}
                    </span>
                </p>
                
            </div>
            <p className="emailRow__time" onClick={handleOnClick}>{email.timestamp}</p>
        </div>
    )
}

export default EmailRow
