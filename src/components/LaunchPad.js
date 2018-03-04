import React from 'react';

import LaunchPadStats from './LaunchPadStats';

const LaunchPad = (props) => {
  return (
    <div>
      <LaunchPadStats launchpad={props.match.params.launchpad} />
    </div>
  );
}
  
export default LaunchPad;
