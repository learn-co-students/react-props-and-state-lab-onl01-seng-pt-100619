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

  onChangeType = (type) => {
    this.setState({filters: {type: type}}, ()=>console.log(this.state.filters.type))
  }

  onFindPetsClick = () => {
    const requestPath = this.state.filters.type === 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
    fetch(requestPath)
      .then(resp => resp.json())
      .then(json => {
        this.setState({pets: json})
      })
  }

  onAdoptPet = id => {
    const petIndex = this.state.pets.findIndex(pet=> pet.id === id)
    const newPetArray = [...this.state.pets]
    newPetArray[petIndex].isAdopted = true
    this.setState({pets: newPetArray})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
