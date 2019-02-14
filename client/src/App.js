import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import './App.css';
import UsersList from './components/UsersList';
import SingleUser from './components/SingleUser';

class App extends Component {
  state = {
    users: []
  };

  componentDidMount(){
    axios
      .get('http://localhost:4000/api/users')
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Route exact path = "/" render={props => <UsersList {...props} users={this.state.users} />} />
        <Route path = "/users/:id" render={props => <SingleUser {...props} users={this.state.users} />}/>
      </div>
    );
  }
}

export default App;
