import React, { useEffect } from 'react';
import "./App.css";
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EmailList from './EmailList';
import Mail from './Mail';
import ComposeMail from './ComposeMail';
import {selectIsComposeMailOpen} from "./features/mailSlice"
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './features/authSlice';
import Login from './Login';
import { auth } from './config/firebase';

function App() {
  const isComposeMailOpen = useSelector(selectIsComposeMailOpen)
  const isUserLoggedIn = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        dispatch(
          login({
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
          })
        )
      }
    })
  }, [dispatch]);

  return (
    <Router>
      {isUserLoggedIn ? (
        <div className="app">
          <Header/>
          <div className="app__body">
            <Sidebar/>
            <Switch>
              <Route path="/:mailId">
                <Mail/>
              </Route>
              <Route path="/">
                <EmailList/>
              </Route>
            </Switch>
          </div>
          {isComposeMailOpen && <ComposeMail/>}
        </div>
      ): (
        <Login/>
      )}
    </Router>
  );
}

export default App;
