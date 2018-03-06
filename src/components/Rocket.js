import React from 'react';

import RocketStats from './RocketStats';

const Rocket = (props) => {
  return (
    <div>
      <RocketStats rocket={props.match.params.rocket}/>
    </div>
  );
}
  
export default Rocket;
