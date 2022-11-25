import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppRoutes from './utils/AppRoutes';

const Loading = () => <p>Loading ...</p>;

function App() {
  return (
    <>
      <React.Suspense fallback={<Loading />}></React.Suspense>
      <Routes>
        <Route path='/' element={<AppRoutes.Home />} />
        <Route path='/profiles' element={<AppRoutes.Profile />} />
      </Routes>
    </>
  );
}

export default App;
