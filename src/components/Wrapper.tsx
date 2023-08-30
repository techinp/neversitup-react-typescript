import './Wrapper.css';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return <section className='container wrapper'>{children}</section>;
};

export default Wrapper;
