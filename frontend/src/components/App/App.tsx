import React from 'react';
import { AppStyles } from './AppStyles';
import Counter from '../../containers/Counter';

function App() {
  return (
      <AppStyles className="App">
          <header className="App-header">
              <Counter />
          </header>
      </AppStyles>
  );
}

export default App;
