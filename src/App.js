import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase'
import { NavBar, SideBar } from "./components";
import { Home } from './views'
import { firestore } from './firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <div style={{ width: '100%', height: '100%' }}>
        <Home />
      </div>
    </div>
  );
}

export default App;
