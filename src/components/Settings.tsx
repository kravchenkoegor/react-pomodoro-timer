import React, { useContext, useRef } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';

const Settings = () => {
  const {
    workDuration,
    shortBreak,
    longBreak,
    autoStart,
    setWorkDuration,
    setShortBreak,
    setLongBreak,
    setAutoStart
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
    <div className="border px-3 py-3 my-4">
      <div className="d-flex">
        <div className="form-group">
          <input
            className="form-control"
            type="number"
            ref={workDurationInput}
            defaultValue={workDuration}
          />
          <small className="form-text text-muted">Pomodoro</small>
        </div>
        <div className="form-group ml-3">
          <input
            className="form-control"
            type="number"
            ref={shortBreakInput}
            defaultValue={shortBreak}
          />
          <small className="form-text text-muted">Short Break</small>
        </div>
        <div className="form-group ml-3">
          <input
            className="form-control"
            type="number"
            ref={longBreakInput}
            defaultValue={longBreak}
          />
          <small className="form-text text-muted">Long Break</small>
        </div>
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
      <button
        type="button"
        className="btn btn-success mt-3"
        onClick={saveSettings}
      >
        Save
      </button>
    </div>
  );
};

export default Settings;
