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

  updateType = (event) => {
    this.setState({
      filters: { ...this.state.filters, type: event.target.value }
    })
  }

  fetchPets = () => {
    let url = '/api/pets'
    if(this.state.filters.type !== 'all'){
      url += `?type=${this.state.filters.type}`
    }
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({pets: json}))
 
  }

  adopt = (id) => {
    const pets = this.state.pets
    let updatedPets = []
    for(let i = 0; i< pets.length; i++){
      if(pets[i].id === id){
        pets[i].isAdopted = true
      }
      updatedPets.push(pets[i])
    }

    this.setState({pets: updatedPets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter </h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
          {console.log(`Pets: ${this.props.pets}`)}
          {console.log(`Type: ${this.state.filters.type}`)}
            <div className="four wide column">
              <Filters onChangeType={this.updateType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adopt} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
