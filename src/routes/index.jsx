import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Home from '../views/front/Home';
import Products from '../views/front/Products';
import Carts from '../views/front/Carts';
import Product from '../views/front/Product';
import NotFound from '../views/NotFound';
import Login from '../views/Login';
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
    path: '*',
    element: <NotFound />,
  },
];

const router = createHashRouter(routes);

export default router;
