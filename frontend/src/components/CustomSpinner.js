import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './CustomSpinner.css';

function CustomSpinner() {
  return (
    <div className='spinner'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
}

export default CustomSpinner;
