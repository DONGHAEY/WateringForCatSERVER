import React from 'react';
import Navbar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import MachinePage from './components/views/Machine/Machine'
import MakePage from './components/views/Make/make'
import Char from './components/views/Chart/PopChart';
import Auth from './Hoc/auth'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
        <Router>
          <Navbar />
          <div>

            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} /> {/*null 누구한테나 다보여라, true 로그인한 사람한테 보여라, false 로그인 안한사람한테 보여라*/}
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/machine" component={MachinePage} />
              <Route exact path="/make" component={MakePage} />
              <Route exact path="/chart" component={Char}  />
            </Switch>
          </div>
        </Router>
  );
}

export default App;
