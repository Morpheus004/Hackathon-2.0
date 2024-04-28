import Login from './components/login';
import React from 'react';
import Navbarfarmar, { farmerDataLoader } from './components/navbarfarmar';
import MyStore from './components/MyStore';
import { RouterProvider, createBrowserRouter, useRoutes } from 'react-router-dom';
import { element } from 'prop-types';
import Cart from './components/cart';
import FarmerStore from './components/store';
import FarmerProfile from './components/FarmerProfile';
import Logout from './components/logout';
import Home from './components/home';
import CustomerCart from './components/customercart';
import CustomerProfile from './components/customerprofile';
import CustomerStore from './components/customerstore';
import Navbarcustomer,{customerDataLoader} from './components/Navbarcustomer'
// import Review from './components/review'
import ReviewPage from './components/review';
import Schemes from './components/schemes'

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
      {path:'home',element:<Home/>},
      {path:'mystore',element:<MyStore/>},
      {path:'profile',element:<FarmerProfile/>},
      {path:'store',element:<FarmerStore/>},
      {path:'cart',element:<Cart/>},
      {path:'schemes',element:<Schemes/>} 

    ] 
  },
  {
    path:'/farmer/cart/review',element:<ReviewPage/>
  },
  {
    path:'/customer',
    element:<Navbarcustomer/>,
    id:'customerloader',
    loader:customerDataLoader,
    children:[
      {path:'profile',element:<CustomerProfile/>},
      {path:'store',element:<CustomerStore/>},
      {path:'cart',element:<CustomerCart/>},   
    ] 
  },
  
  {path:'/Logout',element:<Logout/>}
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
