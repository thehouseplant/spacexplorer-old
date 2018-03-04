import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class CompanyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {}
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
          info: res.data
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

            <Typography component="p">
              <strong>Founder</strong>: {this.state.info.founder}
            </Typography>
            <Typography component="p">
              <strong>Founded</strong>: {this.state.info.founded}
            </Typography>
            <Typography component="p">
              <strong>Employees</strong>: {this.state.info.employees}
            </Typography>
            <Typography component="p">
              <strong>Vehicles</strong>: {this.state.info.vehicles}
            </Typography>
            <Typography component="p">
              <strong>Launch Sites</strong>: {this.state.info.launch_sites}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CompanyInfo;
