import React, { useContext, useRef, useState, useEffect } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';
import { WorkingContext } from '../context/working/workingContext';
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

  const { reset: resetWorkingState } = useContext(WorkingContext);

  const workDurationInput = useRef(workDuration);
  const shortBreakInput = useRef(shortBreak);
  const longBreakInput = useRef(longBreak);
  const autoStartCheckbox = useRef(autoStart);

  const [showAlert, setShowAlert] = useState(false);

  let timeout: number | null = null;

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

    setShowAlert(true);

    timeout = window.setTimeout(() => setShowAlert(false), 2000);

    resetWorkingState();
  };

  useEffect(() => {
    return () => (timeout ? clearTimeout(timeout as number) : undefined);
  }, [timeout]);

  return (
    <div className="settings">
      <h2 className="settings__title">
        Timer Settings
        <span
          className="settings__close"
          onClick={showSettings.bind(null, false)}
        ></span>
      </h2>

      <div className={`settings__alert ${showAlert ? 'visible' : ''}`}>
        Settings have been saved!
      </div>

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
