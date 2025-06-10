// import ListGroup from "./components/ListGroup";


// function App() {
//   return <div><ListGroup></ListGroup></div>
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;