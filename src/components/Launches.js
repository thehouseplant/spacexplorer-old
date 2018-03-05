import React, { Component } from 'react';

import LaunchList from './LaunchList';
import UpcomingLaunchList from './UpcomingLaunchList';

class Launches extends Component {
  render() {
    return (
      <div>
        <UpcomingLaunchList />
        
        <h3>Past Launches</h3>
        <LaunchList />
      </div>
    );
  }
}

export default Launches;
