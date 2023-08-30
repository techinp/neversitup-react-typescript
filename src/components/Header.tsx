import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [show, setShow] = useState(!!token);

  useEffect(() => {
    setShow(!!token);
  }, [token]);

  const onClickLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  if (show) {
    return (
      <section className='absolute h-20 w-full flex justify-around items-center'>
        <section className='font-bold text-2xl hidden md:block'>
          Nerversitup Todo List
        </section>

        <section className='flex justify-end items-center gap-4'>
          <h1>Hello, {username}</h1>
          <Button type='dashed' color='error' onClick={() => onClickLogout()}>
            Sign Out
          </Button>
        </section>
      </section>
    );
  } else return <></>;
};

export default Header;
