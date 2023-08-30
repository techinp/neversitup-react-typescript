import './App.css';

import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <section className='App'>
      <Header />

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
    </section>
  );
}

export default App;
