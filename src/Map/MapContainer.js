import React, { Component } from "react";
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import nyData from '../StatisticsGraph/data.json';
import zipData from './us-zip-code-ny.json';
import InfoWindow from './InfoWindowNew';
import DisplayStat from '../StatisticsGraph/DisplayStat';
import {Nav, Navbar, Form, Button, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zip: '',
      userInput: '',
      stores: this.getZip()
    }
  }
  onMarkerClick = (props, marker) => {
    this.setState({
      zip: props.zip,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  showDetails = () => {
    ReactDOM.render(
      <DisplayStat 
        zip={this.state.zip} 
        zipStore={this.state.stores} 
        />, 
      document.getElementById('root')
    );
    registerServiceWorker();
    
  };
 
  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  inputChangedHandler = ( event ) => {
    this.setState( { userInput: event.target.value } );
  }

  onSubmitHandler = () => {
    for (const key in this.state.stores){
      if (this.state.stores[key][0] === this.state.userInput){
        ReactDOM.render(
          <DisplayStat 
            zip={this.state.userInput} 
            zipStore={this.state.stores} 
            />, 
          document.getElementById('root')
        );
        registerServiceWorker();
        return;
      }
    }
    alert("Error!! \nNo records found for that Zip Code -- Try Again");
  }

  getZip = () => {
    const zipArray = [];
    for (const key in nyData.data) {
        for (const azip in zipData){
            if(nyData.data[key][8] === zipData[azip].fields.zip){
                zipArray.push([nyData.data[key][8],
                                zipData[azip].fields.geopoint[0],
                                zipData[azip].fields.geopoint[1],
                                zipData[azip].fields.city])
            }

        }
    }
    return zipArray;
  };

  render() {
    
    return (
        <section>
          <Navbar bg="primary" variant="dark" style={{ minWidth: 700 }} expand="lg">
          <Navbar.Brand >New York Demographics</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Form inline onSubmit={this.onSubmitHandler}>
            <FormControl type="text" onChange={this.inputChangedHandler} placeholder="Search by ZipCode" className="mr-sm-2" />
            <Button variant="success" size="md" onClick={this.onSubmitHandler}>GO</Button>              
            </Form>
          </Navbar>
          <Map
            onClick={this.onMapClicked}
            google={this.props.google}
            zoom={9}
            initialCenter={{ lat: 40.702348, lng: -73.9428}}
            className='mapStyles' >

            { this.state.stores.map((store, index) => {
              return <Marker 
                    onClick={this.onMarkerClick}
                    name={store[3]+', NY '+store[0]}
                    key={index} 
                    zip={store[0]}
                    position={{
                    lat: store[1],
                    lng: store[2]
                    }}/> 
              })
            }

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
                <button
                  className='infoButton'
                  onClick={this.showDetails}
                > Show Statistics </button>
              </div>
            </InfoWindow>

          </Map>
        </section>         
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBHzhTug1Hynwi6YPWDxrJRKCmisDIFKeM"
})(MapContainer);
