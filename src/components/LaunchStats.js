import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Reddit from 'mdi-material-ui/Reddit';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class LaunchStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launch: {},
      rocket: {},
      telemetry: {},
      launch_site: {},
      links: {},
      cores: [],
      payloads: []
    };
  }

  componentDidMount() {
    this.getLaunchStats();
  }

  getLaunchStats() {
    axios
      .get(`https://api.spacexdata.com/v2/launches?flight_number=${this.props.launch}`)
      .then(res => this.setState(
        {
          launch: res.data[0],
          rocket: res.data[0].rocket,
          telemetry: res.data[0].telemetry,
          launch_site: res.data[0].launch_site,
          links: res.data[0].links,
          cores: res.data[0].rocket.first_stage.cores,
          payloads: res.data[0].rocket.second_stage.payloads
          //settings: res.data[Object.keys(res.data)[0]].settings.index
        }
      ))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Card>
          <CardMedia image={this.state.links.mission_patch} style={{ height: '500px' }} title="Mission Patch" />
          <CardContent>
            <Typography variant="headline" component="h3">
              Flight {this.state.launch.flight_number}
            </Typography>
            <Typography component="p">
              <small>{this.state.launch.launch_date_utc} UTC</small>
            </Typography>
            <Typography component="p">
              {this.state.launch.details}
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Rocket
            </Typography>
            <Typography component="p">
              {this.state.rocket.rocket_name} ({this.state.rocket.rocket_id})
            </Typography>
            <Typography component="p">
              {this.state.telemetry.flight_club}
            </Typography>
            <Typography component="p">
              {this.state.cores.map(core => 
                <Typography component="p">
                  <strong>Serial</strong>: {core.core_serial}
                </Typography>
              )}
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Payload
            </Typography>
            <Typography component="p">
              {this.state.payloads.map(payload => 
                <p>
                  <strong>{payload.payload_id}:</strong>
                  <ul>
                    <li>Type: {payload.payload_type}</li>
                    <li>Mass: {payload.payload_mass_kg}kg / {payload.payload_mass_lb}lbs</li>
                    <li>Orbit: {payload.orbit}</li>
                  </ul>
                </p>
              )}
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Launch Site
            </Typography>
            <Typography component="p">
              {this.state.launch_site.site_name_long} ({this.state.launch_site.site_name})
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Links
            </Typography>
            <Typography component="p">
              <Button component="a" href={this.state.links.reddit_campaign}><Reddit style={{ marginRight: '5px'}} /> Campaign</Button>
              <Button component="a" href={this.state.links.reddit_launch}><Reddit style={{ marginRight: '5px'}} /> Launch</Button>
              <Button component="a" href={this.state.links.reddit_media}><Reddit style={{ marginRight: '5px'}} /> Media</Button>
              <Button component="a" href={this.state.links.presskit}>Presskit</Button>
              <Button component="a" href={this.state.links.article_link}>Article</Button>
              <Button component="a" href={this.state.links.video_link}>Video</Button>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LaunchStats;
