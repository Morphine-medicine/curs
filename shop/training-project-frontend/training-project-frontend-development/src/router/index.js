import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ROLE } from '../clientConfig'

/*can't import from config.js
 relative imports outside of src/ are not supported*/

import AllUsers from '../views/all-users'
import Cart from '../views/cart'
import Home from '../views/home'
import Login from '../views/login'
import NotFoundPage from '../views/not-found-page'
import ProductInfo from '../views/product-info'
import UserInfo from '../views/user-info'
import AddItem from '../views/add-item'
import AllOrders from '../views/all-orders'
import OrderInfo from '../views/order-info'
import PersonalCabinet from '../views/personal-cabinet'

function Router() {

  const noAuthRouts = [
    { path: '/login', component: <Login isRegistered={true} /> },
    { path: '/register', component: <Login isRegistered={false} /> },
    { path: '/cart', component: <Cart /> },
    { path: '/product-info/:id', component: <ProductInfo /> },
    { path: '/', component: <Home /> },
  ]

  const userRouts = [
    { path: '/personal-cabinet', component: <PersonalCabinet /> },
  ]

  const moderRouts = [
    { path: '/add-item', component: <AddItem /> },
    { path: '/add-item/:id', component: <AddItem isEditable={true} /> },
    { path: '/all-orders', component: <AllOrders /> },
    { path: '/order-info/:id', component: <OrderInfo /> }
  ]

  const adminRouts = [
    { path: '/admin/all-users', component: <AllUsers /> },
    { path: '/admin/user-info/:id', component: <UserInfo /> }
  ]

  const roles = localStorage.getItem('roles') || ''

  return (
    <Switch>

      {
        noAuthRouts.map((route, index) => (
          <Route exact path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.USER) &&
        userRouts.map((route, index) => (
          <Route exact path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.MODER) &&
        moderRouts.map((route, index) => (
          <Route exact path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.ADMIN) &&
        adminRouts.map((route, index) => (
          <Route exact path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      <Route>
        <NotFoundPage />
      </Route>

    </Switch>
  )
}


export default Router