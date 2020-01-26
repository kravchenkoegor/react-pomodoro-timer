import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settings/settingsContext';
import StatusBar from '../StatusBar';
import Countdown from '../../screens/Countdown';
import Settings from '../../screens/Settings';

const AppLayout = () => {
  const { settingsIsVisible } = useContext(SettingsContext);

  return (
    <div className="wrapper">
      <StatusBar />
      {!settingsIsVisible ? <Countdown /> : <Settings />}
    </div>
  );
};

export default AppLayout;
