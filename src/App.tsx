import React from 'react';
import { SettingsState } from './context/settings/SettingsState';
import { WorkingState } from './context/working/WorkingState';

import Countdown from './components/Countdown';
import Settings from './components/Settings';

const App: React.FC = () => {
  return (
    <SettingsState>
      <WorkingState>
        <div className="container text-center my-4">
          <div className="row">
            <div className="col-12">
              <Countdown />
            </div>

            <div className="col-12">
              <Settings />
            </div>
          </div>
        </div>
      </WorkingState>
    </SettingsState>
  );
};

export default App;
