import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookOpenPageVariant from 'mdi-material-ui/BookOpenPageVariant';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Video from 'mdi-material-ui/Video';
import axios from 'axios';

class RocketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rockets: []
    };
  }
  
  componentDidMount() {
    this.getRockets();
  }
  
  getRockets() {
    axios
      .get('https://api.spacexdata.com/v2/rockets')
      .then(res => this.setState(
        {
            rockets: res.data
        }
      ))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.rockets.map(rocket => 
          <Card style={{ marginBottom: '25px' }} key={rocket.id}>
            <CardContent>
              <Typography variant="headline" component="h3">
                {rocket.name}
              </Typography>
              <Typography component="p">
                {rocket.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/rocket/${rocket.id}`}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

export default RocketList;
