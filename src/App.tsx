import React from 'react';
import './App.css';
import createRoutes from './routes/routes';

class App extends React.Component {
  render() {
    return (
      <div>
       {createRoutes}
      </div>
    );
  }
}

export default App;
