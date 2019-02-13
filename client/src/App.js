import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import UsersList from './components/UsersList';

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
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}

export default App;
