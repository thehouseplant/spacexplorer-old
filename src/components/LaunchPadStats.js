import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class LaunchPadStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: {},
      location: {},
      vehicles: []
    };
  }

  componentDidMount() {
    this.getLaunchPadStats();
  }

  getLaunchPadStats() {
    axios
      .get(`https://api.spacexdata.com/v2/launchpads/${this.props.launchpad}`)
      .then(res => this.setState(
        {
          stats: res.data,
          location: res.data.location,
          vehicles: res.data.vehicles_launched
        }
      ))
      .catch(err => console.log(err));
  }
  

  render() {
    const MapComponent = withScriptjs(withGoogleMap((props) =>
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.lng }}>
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
      </GoogleMap>
    ))

    return (
      <div>
        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              {this.state.stats.full_name} ({this.state.stats.id})
            </Typography>
            <p>
              <strong>Status</strong>: {this.state.stats.status}
            </p>
            <p>
              {this.state.stats.details}
            </p>
            <p>
              <strong>Location</strong>:
            </p>
            <ul>
              <li>{this.state.location.name}</li>
              <li>{this.state.location.region}</li>
              <li>{this.state.location.latitude}</li>
              <li>{this.state.location.longitude}</li>
            </ul>
            <strong>Vehicles Launched</strong>:
            <ul>
              {this.state.vehicles.map(vehicle =>
                <li key={vehicle}>
                  {vehicle}
                </li>
              )}
            </ul>
            <MapComponent 
              isMarkerShown 
              lat={this.state.location.latitude} 
              lng={this.state.location.longitude} 
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwXeOkvrpyz9dgOZpsB5ahygjdB43Kj2g&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LaunchPadStats;
