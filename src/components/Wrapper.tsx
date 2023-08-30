import './Wrapper.css';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return (
    <section className='container wrapper'>
      <section className='px-8'>{children}</section>
    </section>
  );
};

export default Wrapper;
