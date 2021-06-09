import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/home";
import Navbar from "./components/navbar";
import NewPost from "./pages/new-post";

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Router>
            <Navbar/>
            <div className="app-wrapper">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/new-post" component={NewPost}/>
              </Switch>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
