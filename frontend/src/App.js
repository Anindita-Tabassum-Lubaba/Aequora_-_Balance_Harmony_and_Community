import React, { useEffect } from 'react';
import api from './api';

function App() {
  useEffect(() => {
    api.get('/api/example/')
       .then(res => console.log(res.data))
       .catch(err => console.error(err));
  }, []);

  return <div>React + Django API Test</div>;
}

export default App;
