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

  onChangeType = (value) => {
    this.setState({
      ...this.state.pets,
      filters: {
        type: value
      }
    }
    )
  }

  onFindPetsClick = () => {
    const query = this.state.filters.type
    if (query === "all") {
      fetch(`/api/pets`)
      .then(resp => resp.json()) 
      .then(json => {
        this.setState({
          pets: json,
          ...this.state.filters
        })
      })
    } else {
      fetch(`/api/pets?type=${query}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json,
          ...this.state.filters
        })
      })
    }
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
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
