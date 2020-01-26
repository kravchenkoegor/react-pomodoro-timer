import React from 'react';
import Timer from '../components/Timer';
import Controls from '../components/Controls';

const Countdown: React.FC = () => {
  return (
    <div className="countdown">
      <Timer />
      <Controls />
    </div>
  );
};

export default Countdown;
