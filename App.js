import React,{ Component } from 'react';
import Genderstat from './differentStat/Genderstat'
import MapContainer from './ZipList/MapContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Genderstat /> 
        <MapContainer />
      </div>
    );
  }
}

export default App;