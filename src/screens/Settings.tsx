import React, { useContext, useRef } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';
import Button from '../components/Button';

const Settings = () => {
  const {
    workDuration,
    shortBreak,
    longBreak,
    autoStart,
    setWorkDuration,
    setShortBreak,
    setLongBreak,
    setAutoStart,
    showSettings
  } = useContext(SettingsContext);

  const workDurationInput = useRef(workDuration);
  const shortBreakInput = useRef(shortBreak);
  const longBreakInput = useRef(longBreak);
  const autoStartCheckbox = useRef(autoStart);

  const saveSettings = () => {
    const workDurationValue = Number(workDurationInput.current.value);
    const shortBreakValue = Number(shortBreakInput.current.value);
    const longBreakValue = Number(longBreakInput.current.value);
    const autoStartValue = autoStartCheckbox.current.checked;

    // update only changed values
    if (workDurationValue !== workDuration) {
      setWorkDuration(workDurationValue);
    }

    if (shortBreakValue !== shortBreak) {
      setShortBreak(shortBreakValue);
    }

    if (longBreakValue !== longBreak) {
      setLongBreak(longBreakValue);
    }

    if (autoStartValue !== autoStart) {
      setAutoStart(autoStartValue);
    }
  };

  return (
    <div className="settings">
      <h2 className="settings__title">
        Timer Settings
        <span
          className="settings__close"
          onClick={showSettings.bind(null, false)}
        ></span>
      </h2>

      <div className="form-group">
        <p className="form-text text-muted">Pomodoro</p>
        <input
          className="form-control"
          type="number"
          ref={workDurationInput}
          defaultValue={workDuration}
        />
      </div>
      <div className="form-group">
        <p className="form-text text-muted">Short Break</p>
        <input
          className="form-control"
          type="number"
          ref={shortBreakInput}
          defaultValue={shortBreak}
        />
      </div>
      <div className="form-group">
        <p className="form-text text-muted">Long Break</p>
        <input
          className="form-control"
          type="number"
          ref={longBreakInput}
          defaultValue={longBreak}
        />
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          ref={autoStartCheckbox}
          defaultChecked={autoStart}
        />
        <label className="form-check-label">Auto start next round?</label>
      </div>
      <Button
        onPress={saveSettings}
        btnClassName="settings__btn"
        btnText="save"
      />
    </div>
  );
};

export default Settings;
