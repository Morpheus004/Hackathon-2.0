import Login from './login';
import React from 'react';
import { RouterProvider, createBrowserRouter, useRoutes } from 'react-router-dom';
const router=createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  }
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
