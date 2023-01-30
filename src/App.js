import React from 'react';
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import {Routes, Route} from "react-router-dom"
import './scss/app.scss'
//import pizzas from './assets/pizzas.json'
export const AppContext = React.createContext('');

function App() {

  return (
    <div className="wrapper">
        <Header/>
        <div className="content">
            <Routes>
              <Route path='/' element = {<Home/>}/>
              <Route path='/react-pizza/' element = {<Home/>}/>
              <Route path='/cart' element = {<Cart/>}/>
              <Route path='/pizza/:id' element = {<FullPizza/>}/>
              <Route path='*' element = {<NotFound/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
