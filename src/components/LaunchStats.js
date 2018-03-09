import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Hidden from 'material-ui/Hidden';
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
            <p>
              <small>{this.state.launch.launch_date_utc} UTC</small>
            </p>
            <p>
              {this.state.launch.details}
            </p>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Rocket
            </Typography>
            <p>
              {this.state.rocket.rocket_name} ({this.state.rocket.rocket_id})
            </p>
            <p>
              {this.state.telemetry.flight_club}
            </p>
            <strong>Cores</strong>:
            {this.state.cores.map(core => 
              <ul key={core.core_serial}>
                <li>
                  <strong>Serial</strong>: {core.core_serial}
                </li>
                <li>
                  <strong>Flight</strong>: {core.flight}
                </li>
                <li>
                  <strong>Block</strong>: {core.block}
                </li>
                <li>
                  <strong>Reused</strong>: {core.reused}
                </li>
                <li>
                  <strong>Land Success</strong>: {core.land_success}
                </li>
                <li>
                  <strong>Landing Type</strong>: {core.landing_type}
                </li>
                <li>
                  <strong>Landing Vehicle</strong>: {core.landing_vehicle}
                </li>
              </ul>
            )}
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Payload
            </Typography>
            {this.state.payloads.map(payload => 
              <ul key={payload.payload_id}>
                <li>Customers:
                  <ul>
                    {payload.customers.map(customer =>
                      <li key={customer}>
                        {customer}
                      </li>
                    )}
                  </ul>
                </li>
                <li>Type: {payload.payload_type}</li>
                <li>Mass: {payload.payload_mass_kg}kg / {payload.payload_mass_lbs}lbs</li>
                <li>Orbit: {payload.orbit}</li>
              </ul>
            )}
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Launch Site
            </Typography>
            <p>
              {this.state.launch_site.site_name_long} (<Link className="basic-link" to={`/launchpad/${this.state.launch_site.site_id}`}>{this.state.launch_site.site_name}</Link>)
            </p>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Links
            </Typography>
            <Hidden smDown>
              <p>
                <Button component="a" href={this.state.links.reddit_campaign}><Reddit style={{ marginRight: '5px'}} /> Campaign</Button>
                <Button component="a" href={this.state.links.reddit_launch}><Reddit style={{ marginRight: '5px'}} /> Launch</Button>
                <Button component="a" href={this.state.links.reddit_media}><Reddit style={{ marginRight: '5px'}} /> Media</Button>
                <Button component="a" href={this.state.links.presskit}>Presskit</Button>
                <Button component="a" href={this.state.links.article_link}>Article</Button>
                <Button component="a" href={this.state.links.video_link}>Video</Button>
              </p>
            </Hidden>
            <Hidden mdUp>
              <p>
                <Button fullWidth variant="raised" color="secondary" component="a" href={this.state.links.reddit_campaign}><Reddit style={{ marginRight: '5px'}} /> Campaign</Button>
              </p>
              <p>
                <Button fullWidth variant="raised" color="secondary" component="a" href={this.state.links.reddit_launch}><Reddit style={{ marginRight: '5px'}} /> Launch</Button>
              </p>
              <p>
                <Button fullWidth variant="raised" color="secondary" component="a" href={this.state.links.reddit_media}><Reddit style={{ marginRight: '5px'}} /> Media</Button>
              </p>
              <p>
                <Button fullWidth variant="raised" component="a" href={this.state.links.presskit}>Presskit</Button>
              </p>
              <p>
                <Button fullWidth variant="raised" component="a" href={this.state.links.article_link}>Article</Button>
              </p>
              <p>
                <Button fullWidth variant="raised" component="a" href={this.state.links.video_link}>Video</Button>
              </p>
            </Hidden>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LaunchStats;
