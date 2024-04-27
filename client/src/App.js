import Login from './components/login';
import React from 'react';
import Navbarfarmar, { farmerDataLoader } from './components/navbarfarmar';
import MyStore from './components/MyStore';
import { RouterProvider, createBrowserRouter, useRoutes } from 'react-router-dom';
import { element } from 'prop-types';
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
      {path:'mystore',element:<MyStore/>}
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
