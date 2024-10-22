import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AuthLayout from '../auth/index';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';
import AdminLayout from '../adminview/layout';
import AdminDashboard from '@/pages/adminview/dashboard';
import AdminOrders from '@/pages/adminview/orders';
import AdminFeature from '@/pages/adminview/feature';
import AdminProduct from '@/pages/adminview/product';
import Shoppinglayout from '../shoppingview/layout';
import Routeerror from '@/pages/not-found/routeerror';
import ShoppingAccount from '@/pages/shoppingview/account';
import ShoppingListing from '@/pages/shoppingview/listing';
import ShoppingCheckout from '@/pages/shoppingview/checkout';
import ShoppingHome from '@/pages/shoppingview/home';

const routes = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white " >
      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="order" element={<AdminOrders/>}/>
          <Route path="feature" element={<AdminFeature/>}/>
          <Route path="product" element={<AdminProduct/>}/>
        </Route>
        <Route path="/shop" element={<Shoppinglayout/>}>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShoppingListing/>}/>
          <Route path="checkout" element={<ShoppingCheckout/>}/>
          <Route path="account" element={<ShoppingAccount/>}/>
        </Route>
        <Route path="*" element={<Routeerror/>}/>

      </Routes>
    </div>
  )
}

export default routes