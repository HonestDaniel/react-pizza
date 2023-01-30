import React from 'react';
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import {Routes, Route} from "react-router-dom"
import './scss/app.scss'
import MainLayout from './layouts/MainLayout';
export const AppContext = React.createContext('');

function App() {

  return (
    <Routes>
      <Route path='/' element = {<MainLayout />}>
        <Route path='/' element = {<Home/>}/>
        <Route path='/react-pizza/' element = {<Home/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/pizza/:id' element = {<FullPizza/>}/>
        <Route path='*' element = {<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
