import React, { useState } from 'react';
import FCFSForm from './components/FCFSForm';
import FCFSResult from './components/FCFSResult';

function App() {
  const [processData, setProcessData] = useState([]);

  return (
    <div className="App">
      <h1>OS Scheduler Simulator</h1>
      <FCFSForm onSubmit={setProcessData} />
      <FCFSResult processes={processData} />
    </div>
  );
}

export default App;
