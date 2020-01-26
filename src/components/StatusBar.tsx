import React, { useContext } from 'react';
import { WorkingContext } from '../context/working/workingContext';

const StatusBar: React.FC = () => {
  const { pomodoros } = useContext(WorkingContext);

  return (
    <div className="status-bar">
      <div className="status-bar__info">
        <span>{new Date().toLocaleDateString('ru')}</span>
        <span>{`${pomodoros}/8 completed`}</span>
      </div>
    </div>
  );
};

export default StatusBar;
