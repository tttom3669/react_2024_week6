import { createHashRouter } from 'react-router-dom';
import App from '../App';
import AdminLayout from '../Layouts/AdminLayout';
import Home from '../views/front/Home';
import Products from '../views/front/Products';
import Carts from '../views/front/Carts';
import Product from '../views/front/Product';
import NotFound from '../views/NotFound';
import Login from '../views/Login';
import AdminHome from '../views/admin/AdminHome';
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <Product />,
      },
      {
        path: 'carts',
        element: <Carts />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createHashRouter(routes);

export default router;
