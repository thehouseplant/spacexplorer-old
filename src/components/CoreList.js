import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import axios from 'axios';

class CoreList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cores: []
    };
  }
  
  componentDidMount() {
    this.getCores();
  }
  
  getCores() {
    axios
      .get('https://api.spacexdata.com/v2/parts/cores')
      .then(res => this.setState(
        {
          cores: res.data
        }
      ))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.cores.map(core => 
          <Card style={{ marginBottom: '25px' }} key={core.core_serial}>
            <CardContent>
              <Typography variant="headline" component="h3">
                Core: {core.core_serial}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/core/${core.core_serial}`}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

export default CoreList;
