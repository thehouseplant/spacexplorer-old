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
      thrust_sea_level: {},
      thrust_vacuum: {},
      second_stage: {},
      thrust: {},
      payloads: {},
      composite_fairing_height: {},
      composite_fairing_diameter: {},
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
          thrust_sea_level: res.data.first_stage.thrust_sea_level,
          thrust_vacuum: res.data.first_stage.thrust_vacuum,
          second_stage: res.data.second_stage,
          thrust: res.data.second_stage.thrust,
          payloads: res.data.second_stage.payloads,
          composite_fairing_height: res.data.second_stage.payloads.composite_fairing.height,
          composite_fairing_diameter: res.data.second_stage.payloads.composite_fairing.diameter,
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
              <strong>Country of Origin</strong>: {this.state.stats.country}
            </p>
            <p>
              <strong>First Flight</strong>: {this.state.stats.first_flight}
            </p>
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
            <p>
              <strong>Stages</strong>: {this.state.stats.stages}
            </p>
            <p>
              <strong>Boosters</strong>: {this.state.stats.boosters}
            </p>
            <p>
              <strong>Cost per Launch</strong>: ${this.state.stats.cost_per_launch}
            </p>
            <p>
              <strong>Success Rate</strong>: {this.state.stats.success_rate_pct}%
            </p>
            <p>
              <strong>Landing Legs</strong>: {this.state.landing_legs.number} ({this.state.landing_legs.material})
            </p>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Payload
            </Typography>
            {this.state.payload_weights.map(payload => 
              <div key={payload.id}>
                <p>
                  <strong>Name</strong>: {payload.name} ({payload.id})
                </p>
                <p>
                  <strong>Weight</strong>: {payload.kg}kg / {payload.lb}lbs
                </p>
              </div>
            )}
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

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              First Stage
            </Typography>
            <p>
              <strong>Reuseable</strong>: {this.state.first_stage.reusable}
            </p>
            <p>
              <strong>Engines</strong>: {this.state.first_stage.engines}
            </p>
            <p>
              <strong>Fuel Amount</strong>: {this.state.first_stage.fuel_amount_tons} tons
            </p>
            <p>
              <strong>Burn Time</strong>: {this.state.first_stage.burn_time_sec}s
            </p>
            <p>
              <strong>Thrust (Sea Level)</strong>: {this.state.thrust_sea_level.kN}kN / {this.state.thrust_sea_level.lbf}lbf
            </p>
            <p>
              <strong>Thrust (Vacuum)</strong>: {this.state.thrust_vacuum.kN}kN / {this.state.thrust_vacuum.lbf}lbf
            </p>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '25px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              Second Stage
            </Typography>
            <p>
              <strong>Engines</strong>: {this.state.second_stage.engines}
            </p>
            <p>
              <strong>Fuel Amount</strong>: {this.state.second_stage.fuel_amount_tons} tons
            </p>
            <p>
              <strong>Burn Time</strong>: {this.state.second_stage.burn_time_sec}s
            </p>
            <p>
              <strong>Thrust</strong>: {this.state.thrust.kN}kN / {this.state.thrust.lbf}lbf
            </p>
            <p>
              <strong>Payloads</strong>:
            </p>
            <ul>
              <li>
                <strong>Option 1</strong>: {this.state.payloads.option_1}
              </li>
              <li>
                <strong>Height</strong>: {this.state.composite_fairing_height.meters}m / {this.state.composite_fairing_height.feet}ft
              </li>
              <li>
                <strong>Diameter</strong>: {this.state.composite_fairing_diameter.meters}m / {this.state.composite_fairing_diameter.feet}ft
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default RocketStats;
