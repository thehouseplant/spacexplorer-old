import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class RocketStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: {},
      height: {},
      diameter: {},
      mass: {},
      payload_weights: [],
      first_stage: {},
      second_stage: {},
      engines: {},
      landing_legs: {}
    };
  }

  componentDidMount() {
    this.getRocketStats();
  }

  getRocketStats() {
    axios
      .get(`https://api.spacexdata.com/v2/rockets/${this.props.rocket}`)
      .then(res => this.setState(
        {
          stats: res.data,
          height: res.data.height,
          diameter: res.data.diameter,
          mass: res.data.mass,
          payload_weights: res.data.payload_weights,
          first_stage: res.data.first_stage,
          second_stage: res.data.second_stage,
          engines: res.data.engines,
          landing_legs: res.data.landing_legs
        }
      ))
      .catch(err => console.log(err));
  }
  

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="headline" component="h3">
              {this.state.stats.name} ({this.state.stats.id})
            </Typography>
            <p>
              <strong>Status</strong>: {this.state.stats.active}
            </p>
            <p>
              {this.state.stats.description}
            </p>
            <p>
              <strong>Height</strong>: {this.state.height.meters}m / {this.state.height.feet}ft
            </p>
            <p>
              <strong>Diameter</strong>: {this.state.diameter.meters}m / {this.state.diameter.feet}ft
            </p>
            <p>
              <strong>Mass</strong>: {this.state.mass.kg}kg / {this.state.mass.lb}lb
            </p>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Engines
            </Typography>
            <p>
              <strong>Number</strong>: {this.state.engines.number}
            </p>
            <p>
              <strong>Type</strong>: {this.state.engines.type}
            </p>
            <p>
              <strong>Version</strong>: {this.state.engines.version}
            </p>
            <p>
              <strong>Layout</strong>: {this.state.engines.layout}
            </p>
            <p>
              <strong>Engine Loss (Max)</strong>: {this.state.engines.engine_loss_max}
            </p>
            <p>
              <strong>Propellants</strong>: {this.state.engines.propellant_1} / {this.state.engines.propellant_2}
            </p>
            <p>
              <strong>Thrust to Weight</strong>: {this.state.engines.thrust_to_weight}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default RocketStats;
