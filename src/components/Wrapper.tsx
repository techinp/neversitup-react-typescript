import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return (
    <section className='container flex justify-center items-center mx-auto flex-col min-h-screen'>
      {children}
    </section>
  );
};

export default Wrapper;
