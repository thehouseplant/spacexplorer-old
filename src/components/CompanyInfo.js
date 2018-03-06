import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class CompanyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      headquarters: {}
    };
  }

  componentDidMount() {
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    axios
      .get(`https://api.spacexdata.com/v2/info`)
      .then(res => this.setState(
        {
          info: res.data,
          headquarters: res.data.headquarters
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
              {this.state.info.name}
            </Typography>
            <p>
              {this.state.info.summary}
            </p>

            <p>
              <strong>Founder</strong>: {this.state.info.founder}
            </p>
            <p>
              <strong>Founded</strong>: {this.state.info.founded}
            </p>
          
            <strong>Headquarters</strong>:
            <ul>
              <li>{this.state.headquarters.address}</li>
              <li>{this.state.headquarters.city}, {this.state.headquarters.state}</li>
            </ul>
            <p>
              <strong>Employees</strong>: {this.state.info.employees}
            </p>
            <p>
              <strong>Vehicles</strong>: {this.state.info.vehicles}
            </p>
            <p>
              <strong>Launch Sites</strong>: {this.state.info.launch_sites}
            </p>
            <p>
              <strong>Test Sites</strong>: {this.state.info.test_sites}
            </p>
            <strong>Key Staff</strong>:
            <ul>
              <li>CEO: {this.state.info.ceo}</li>
              <li>CTO: {this.state.info.cto}</li>
              <li>COO: {this.state.info.coo}</li>
            </ul>
            <p>
              <strong>Valuation</strong>: ~${this.state.info.valuation}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CompanyInfo;
