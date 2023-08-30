import './Header.css';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <section className='header-wrapper'>
        <section className='font-bold text-2xl hidden md:block whitespace-nowrap md:pl-8 pl-0'>
          Nerversitup Todo List
        </section>

        <section className='flex md:justify-end justify-around items-center gap-4 w-full md:pr-8 pr-0'>
          <section>
            <h1 className='text-xl'>Hello, {username}</h1>
          </section>
          <section>
            <Button type='dashed' danger onClick={() => onClickLogout()}>
              Sign Out
            </Button>
          </section>
        </section>
      </section>
    );
  } else return <></>;
};

export default Header;
