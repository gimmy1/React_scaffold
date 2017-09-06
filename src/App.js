import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContacts from './CreateContacts'
import * as ContactsAPI from './utils/ContactsAPI'


class App extends Component {
  state = {
    screen: 'list',  // list, create
    contacts: []
  }

  // when component mounts make an API request
  // when API request is resolved
  // update state with setState and re-renders component
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({
        contacts
      })
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContacts
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}


export default App;
