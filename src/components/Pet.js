import React from 'react'

class Pet extends React.Component {

  gender = () => {
    if(this.props.pet.gender === 'female'){ return <p>'♀'</p>}
    if(this.props.pet.gender === 'male'){ return <p>'♂'</p> } 
  }

  isAdopted = () =>{
        if(this.props.pet.isAdopted) { return <button className="ui disabled button">Already adopted</button>}
        if(!this.props.pet.isAdopted) { return  <button className="ui primary button">Adopt pet</button>}
          }

  render() {
    return (
      <div className="card">
        <div className="content">
          <a href='/' className="header">
            {this.props.pet.gender === 'female' ? '♀' : '♂'}
            {this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
        {this.props.pet.isAdopted ? (
            <button className="ui disabled button">Already adopted</button>
          ) : (
            <button
              onClick={() => this.props.onAdoptPet(this.props.pet.id)}
              className="ui primary button">
              Adopt pet
            </button>
          )}          
        </div>
      </div>
    )
  }
}

export default Pet
