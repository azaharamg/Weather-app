import React from 'react';
import '../stylesheet/error.css';

const Error = ({ message }) => {
  return <p className='error'>{message}</p>;
};

export default Error;
