import React, { Profiler, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Network from './pages/Network/Network';
import Traffic from './pages/Network/Traffic';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change
  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime })
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Profiler id="dashboard" onRender={onRender}><Dashboard /></Profiler>} />
        <Route exact path="not-found" element={<NotFound />} />
        <Route exact path="network" element={<Network />} />
        <Route exact path="traffic" element={<Traffic />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
