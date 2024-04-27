import Login from './components/login';
import React from 'react';
import Navbarfarmar, { farmerDataLoader } from './components/navbarfarmar';
import MyStore from './components/MyStore';
import { RouterProvider, createBrowserRouter, useRoutes } from 'react-router-dom';
import { element } from 'prop-types';
import Cart from './components/cart';
import FarmerStore from './components/store';
import FarmerProfile from './components/FarmerProfile';
const router=createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/farmer',
    element:<Navbarfarmar/>,
    id:'farmerloader',
    loader:farmerDataLoader,
    children:[
      {path:'mystore',element:<MyStore/>},
      {path:'profile',element:<FarmerProfile/>},
      {path:'store',element:<FarmerStore/>},
      {path:'cart',element:<Cart/>}
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
