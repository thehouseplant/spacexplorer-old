import React from 'react';

import LaunchStats from './LaunchStats';

const Launch = (props) => {
  return (
    <div>
      <LaunchStats launch={props.match.params.launch} />
    </div>
  );
}
  
export default Launch;
