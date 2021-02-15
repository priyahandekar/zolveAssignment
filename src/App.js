
import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import InputField from "./InputField";
import WebcamCapture from "./webCam";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export default function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"> <img src="https://zolve.com/static/images/zolve_logo.svg" alt="Zolvo" height="50px" width="50px" /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">Home</Link>
            <Link to="/input?q=123">Input Content</Link>
            <Link to="/webcam-selfie">Webcam-selfie</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/input">
          <InputField />
        </Route>
        <Route path="/webcam-selfie">
          <WebcamCapture />
        </Route>
      </Switch>
    </Router>
  )
}