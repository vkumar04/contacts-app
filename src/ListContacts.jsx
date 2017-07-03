import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static PropTypes = {
    contacts: PropTypes.array.isRequired,
    removeContact: PropTypes.func.isRequired,
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  render() {
    const {contacts, removeContact} = this.props;
    const {query} = this.state;

    let showingContacts;
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts= contacts.filter((contact) => match.test(contact.name));
    }else{
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return (
     <div className='list-contacts'>
       <div className='list-contacts-top'>
        <input type='text' className='search-contacts' placeholder='Serach Contacts' onChange={(event) => this.updateQuery(event.target.value)}/>
        <Link to='/create' className='add-contact'>Add Contact</Link>
       </div>
       <ol className='contact-list'>
        {showingContacts.map((contact) =>
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
            }} />
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button className='contact-remove' onClick={() => removeContact(contact)}>Remove</button>
          </li>
        )}
      </ol>
     </div> 
    )
  }
}

export default ListContacts;