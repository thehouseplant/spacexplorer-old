import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class LaunchPadList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launchpads: []
    };
  }
  
  componentDidMount() {
    this.getLaunchPads();
  }
  
  getLaunchPads() {
    axios
      .get('https://api.spacexdata.com/v2/launchpads')
      .then(res => this.setState(
        {
            launchpads: res.data
        }
      ))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.launchpads.map(launchpad => 
          <Card style={{ marginBottom: '25px' }} key={launchpad.id}>
            <CardContent>
              <Typography variant="headline" component="h3">
                {launchpad.full_name}
              </Typography>
              <Typography component="p">
                {launchpad.details}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/launchpad/${launchpad.id}`}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

export default LaunchPadList;
