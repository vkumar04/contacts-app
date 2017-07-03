import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

import './index.css';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  deleteContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts removeContact={this.deleteContact} contacts={this.state.contacts}/>
        )} />
        <Route path='/create' component={CreateContact} />
      </div>
    )
  }
}

export default App;