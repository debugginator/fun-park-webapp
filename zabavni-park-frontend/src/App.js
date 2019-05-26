import React, { Component } from 'react';

class App extends Component {
  state = {attractions: []};

  componentDidMount() {
    fetch('/atrakcija')
      .then(res => res.json())
      .then(attractions => this.setState({ attractions }));
  }

  render() {
    return (
      <div className="App">
        <h1>Attractions</h1>
        {this.state.attractions.map(attraction =>
          <div key={attraction.id}>{attraction.naziv}</div>
        )}
      </div>
    );
  }
}

export default App;