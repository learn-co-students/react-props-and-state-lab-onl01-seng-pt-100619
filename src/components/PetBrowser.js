import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  
  onAdoptPet = (id) => {
    this.props.onAdoptPet(id)
  }

  render() {
   
    return this.props.pets.map(pet => {
      return (<div key={pet.id} className="ui cards"><Pet pet={pet} onAdoptPet={this.props.onAdoptPet} /></div>)
    })
  }
}

export default PetBrowser