import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Launches from './Launches';
import Launch from './Launch';
import Rockets from './Rockets';
import Rocket from './Rocket';
import LaunchPads from './LaunchPads';
import LaunchPad from './LaunchPad';
import Capsules from './Capsules';
import Cores from './Cores';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/launches" component={Launches} />
          <Route path="/launch/:launch" component={Launch} />
          <Route path="/rockets" component={Rockets} />
          <Route path="/rocket/:rocket" component={Rocket} />
          <Route path="/launchpads" component={LaunchPads} />
          <Route path="/launchpad/:launchpad" component={LaunchPad} />
          <Route path="/capsules" component={Capsules} />
          <Route path="/cores" component={Cores} />
        </Switch>
      </main>
    );
  }
}

export default Main;