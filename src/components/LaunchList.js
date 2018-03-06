import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookOpenPageVariant from 'mdi-material-ui/BookOpenPageVariant';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Video from 'mdi-material-ui/Video';
import axios from 'axios';
import moment from 'moment';

class LaunchList extends Component {
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
      .get('https://api.spacexdata.com/v2/launches?order=desc')
      .then(res => this.setState(
        {
          launches: res.data
        }
      ))
      .catch(err => console.log(err));
  }

  render() {
    const LaunchDate = (props) => moment.unix(props.date).format('MM/DD/YYYY');

    return (
      <div>
        {this.state.launches.map(launch => 
          <Card style={{ marginBottom: '25px' }} key={launch.flight_number}>
            <CardContent>
              <Typography variant="headline" component="h3">
                Flight {launch.flight_number}
              </Typography>
              <LaunchDate date={launch.launch_date_unix} />
              <p>
                {launch.details}
              </p>
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

export default LaunchList;
