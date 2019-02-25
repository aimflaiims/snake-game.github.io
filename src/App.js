import React, { Component } from 'react';

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from "./components/Login";
import Error404 from "./components/Error404";
import Navigation from './components/Navigation';
import Ground from './components/Snake';

const Home = () => {
  return (
    <div>
      <Ground size={20}/>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Navigation />
          <hr/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
