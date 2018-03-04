import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class CapsuleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      capsules: []
    };
  }
  
  componentDidMount() {
    this.getCapsules();
  }
  
  getCapsules() {
    axios
      .get('https://api.spacexdata.com/v2/capsules')
      .then(res => this.setState(
        {
          capsules: res.data
        }
      ))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.capsules.map(capsule => 
          <Card style={{ marginBottom: '25px' }} key={capsule.id}>
            <CardContent>
              <Typography variant="headline" component="h3">
                {capsule.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/capsule/${capsule.id}`}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

export default CapsuleList;
