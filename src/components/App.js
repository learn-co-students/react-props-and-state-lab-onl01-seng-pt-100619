import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onTypeChanged = (event) => {
    console.log(event.target.value);
    this.setState({
      filters: {
        type: event.target.value,
      },
    });
  };

  onFindPetsClicked = (event) => {
    console.log(event);
    var url = "";
    if (this.state.filters.type === "all") {
      url = "/api/pets";
    } else {
      url = "/api/pets?type=" + this.state.filters.type;
    }
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          pets: data,
        })
      );
  };
  onPetAdopted = (id) => {
    console.log(id);
    const newPets = this.state.pets.slice();

    const pet = newPets.find((element) => element.id === id);
    pet.isAdopted = true;
    this.setState({
      pets: newPets,
    });
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
              <Filters
                onFindPetsClick={this.onFindPetsClicked}
                onChangeType={this.onTypeChanged}
                type="submit"
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.onPetAdopted}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
