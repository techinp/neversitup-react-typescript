import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Wrapper from './components/Wrapper';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const token = localStorage.getItem('token');

  return (
    <section className='App'>
      {token && <Header />}

      <Wrapper>
        <Routes>
          <Route path='/login' Component={Login} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/search'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Wrapper>
    </section>
  );
}

export default App;
