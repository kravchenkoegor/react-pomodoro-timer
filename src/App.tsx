import React from 'react';
import { SettingsState } from './context/settings/SettingsState';
import { WorkingState } from './context/working/WorkingState';
import AppLayout from './components/hoc/AppLayout';

const App: React.FC = () => {
  return (
    <SettingsState>
      <WorkingState>
        <AppLayout />
      </WorkingState>
    </SettingsState>
  );
};

export default App;
