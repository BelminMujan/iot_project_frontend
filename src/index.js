import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import store from "./store";
import './index.css'
import Register from './screens/Register';
import Overview from './screens/Overview';
const root = ReactDOM.createRoot(document.getElementById('root'));
const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path:"/",
    element: <Dashboard/>,
    children: [
      {
        path: "",
        element: <Overview/>
      }
    ]
  },
])
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
  </React.StrictMode>
);
