import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import nyData from '../differentStat/data.json';
import zipData from './us-zip-code-ny.json';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      stores: this.getZip()
    }
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  getZip = () => {
    const zipArray = [];
    for (const key in nyData.data) {
        for (const azip in zipData){
            if(nyData.data[key][8] == zipData[azip].fields.zip){
                zipArray.push([nyData.data[key][8],
                                zipData[azip].fields.geopoint[0],
                                zipData[azip].fields.geopoint[1]])
            }

        }
    }
    return zipArray;
  };

  render() {
    const mapStyles = {
      width: '80%',
      height: '90%',
    };
    return (
        <Map
          google={this.props.google}
          zoom={9}
          style={mapStyles}
          initialCenter={{ lat: 40.702348, lng: -73.9428}} >

          { this.state.stores.map((store, index) => {
            return <Marker 
                  onClick={this.onMarkerClick}
                  name={store[0]} 
                  id={index} 
                  position={{
                  lat: store[1],
                  lng: store[2]
                  }}/> 
            })
          }
          <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                  </div>
          </InfoWindow>

        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDu7qZZGRd4iyqnTZlaWQAeebrRPkeVAuk"
})(MapContainer);
