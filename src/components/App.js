import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleStateChange = (event) => {
    console.log(event.target.value)
    this.setState({
      ...this.state,
      filters: {
        type: event.target.value
      }
    })
  }

  handlePetsClick = (event) => {
    let currentFilter = ""
    switch(this.state.filters.type) {
      case 'all':
        currentFilter = ""
        break;
      case 'dog':
        currentFilter = "?type=dog"
        break;
      case 'cat':
        currentFilter = "?type=cat"
        break;
      case 'micropig':
        currentFilter = "?type=micropig"
        break;
      default:
        console.log('filter does not match dog, micropig, all, or cat')
    }
    fetch(`/api/pets${currentFilter}`).then((list) => list.json()).then((resp) => {
      console.log(resp)
      this.setState({
        ...this.state,
        pets: resp 
      })
    })
  }

  handleAdopt = (id) => {
    const petsMap = this.state.pets.map(pet => {
      if (pet.id === id) {
        return {...pet, isAdopted: true }
      } else {
        return pet 
      }
    });
    this.setState({ pets: petsMap });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleStateChange} onFindPetsClick={this.handlePetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
