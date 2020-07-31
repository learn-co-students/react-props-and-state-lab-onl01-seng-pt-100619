
import React from 'react'

class Pet extends React.Component {
  render() {
    const genderSymbol = () => {
      if (this.props.pet.gender === 'male') {
        return '♂'
      } else {
        return '♀'
      }
    }

    const adoptPetButton = () => {
      if (this.props.pet.isAdopted === true) {
        return (
        <div className="extra content">
        <button className="ui disabled button">Already adopted</button>
        </div>)
      } else {
        return (
          <div className="extra content">
          <button className="ui primary button" onClick={() => this.props.onAdoptPet(this.props.pet.id)}>Adopt pet</button>
          </div>)
      }      
    }

    return (
      <div className="card">
        <div className="content">
          <p className="header">
            {genderSymbol()}
            {this.props.pet.name}
          </p>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        {adoptPetButton()}
      </div>
    )
  }
}

export default Pet