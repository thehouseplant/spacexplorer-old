import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookOpenPageVariant from 'mdi-material-ui/BookOpenPageVariant';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Video from 'mdi-material-ui/Video';
import axios from 'axios';

class UpcomingLaunchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launches: []
    };
  }
  
  componentDidMount() {
    this.getLaunches();
  }
  
  getLaunches() {
    axios
      .get('https://api.spacexdata.com/v2/launches/upcoming?order=desc')
      .then(res => this.setState(
        {
          launches: res.data
        }
      ))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.launches.map(launch => 
          <Card style={{ marginBottom: '25px' }} key={launch.flight_number}>
            <CardContent>
              <Typography variant="headline" component="h3">
                Flight {launch.flight_number}
              </Typography>
              <Typography component="p">
                {launch.details}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/launch/${launch.flight_number}`}>
                Learn More
              </Button>
              <IconButton component="a" href={launch.links.video_link}>
                <Video />
              </IconButton>
              <IconButton component="a" href={launch.links.article_link} style={{ marginLeft: '15px' }}>
                <BookOpenPageVariant />
              </IconButton>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

export default UpcomingLaunchList;
