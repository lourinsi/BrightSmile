import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Logo: React.FC = () => {
  const location = useLocation();
  
  return (
      <div className="logo">
        <h1>BrightSmile😊</h1>
      </div>

  );
};

export default Logo;