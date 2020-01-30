import React, { useContext, useEffect } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';
import { WorkingContext } from '../context/working/workingContext';
import Button from '../components/Button';
// import { ReactComponent as ReloadIcon } from './icons/reload.svg';

const Controls: React.FC = () => {
  const { settingsIsVisible, showSettings } = useContext(SettingsContext);

  const { session, startSession, stopSession, tick } = useContext(
    WorkingContext
  );

  useEffect(() => {
    let timer: any;

    if (session) {
      timer = setInterval(() => tick(), 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [session, tick]);

  const onPress = () => {
    session ? stopSession() : startSession();
  };

  return (
    <div className="controls">
      <Button
        onPress={onPress}
        btnText={!session ? 'Start' : 'Pause'}
        btnClassName={`controls__btn ${
          !session ? 'controls__btn_start' : 'controls__btn_pause'
        } `}
      />

      <Button
        btnClassName="controls__btn controls__btn_accent"
        onPress={showSettings.bind(null, !settingsIsVisible)}
        btnText="settings"
      />

      {/* <ReloadIcon height="32" width="32" onClick={() => console.log(1)} /> */}
    </div>
  );
};

export default Controls;
