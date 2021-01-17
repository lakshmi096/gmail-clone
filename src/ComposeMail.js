import React, { useState } from 'react';
import "./ComposeMail.css";
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeComposeMail, selectDraft, setDraft } from './features/mailSlice';
import firebase from "firebase";
import {db} from "./config/firebase";
import { selectUser } from './features/authSlice';

const ComposeMail = () => {
    const dispatch = useDispatch();
    const [actionType, setActionType] = useState(null)
    const user = useSelector(selectUser);
    const draft = useSelector(selectDraft)

    const { register,handleSubmit } = useForm({
        defaultValues: {
            to: draft? draft?.to : null,
            subject: draft? draft?.subject : null,
            message: draft? draft?.message : null,
            from: draft? draft?.from : null,
            fromMail: draft? draft?.fromMail : null,
        }
    })

    const onSubmit = (formData) => {
        const newMail = {
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            from: user?.displayName,
            fromMail: user?.email,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        }
        if(actionType === "submit") sendMail(newMail); 
        if(actionType === "draft") saveDraft(newMail); 
        
        dispatch(setDraft(null))
        handleComposeMailClose();
    }

    const handleComposeMailClose = () => {
        dispatch(closeComposeMail());
    }

    const sendMail = (mail) => {
        mail.sent = true;
        if(draft?.id) {
            mail.drafts = false;
            db.collection("emails").doc(draft.id).update(mail);
        } else {
            db.collection("emails").add(mail);
        }
    }

    const saveDraft = (mail) => {
        mail.drafts = true;
        if(draft?.id) {
            db.collection("emails").doc(draft.id).update(mail);
        } else {
            db.collection("emails").add(mail);
        }
    }

    return (
        <div className="composeMail">
            <div className="composeMail__header">
                <h3>new message</h3>
                <CloseIcon className="composeMail__close" onClick={handleComposeMailClose}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" name="to" id="to" placeholder="Recipients" ref={register({ required: true })} />
                <input type="text" name="subject" id="subject" placeholder="Subject" ref={register({ required: true })} />
                <input type="textarea" name="message" id="message" className="composeMail__body" ref={register({ required: true })} />

                <div className="composeMail__options">
                    <Button color="primary" variant="contained" type="submit" className="composeMail__send" onClick={() => setActionType("submit")}>send</Button>
                    <Button color="primary" variant="contained" type="submit" className="composeMail__send" onClick={() => setActionType("draft")}>draft</Button>
                </div>
            </form>
        </div>
    )
}

export default ComposeMail
