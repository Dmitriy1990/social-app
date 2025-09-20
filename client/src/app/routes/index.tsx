import { createBrowserRouter } from 'react-router-dom';
import { routes } from '../../shared/api/routes';
import { Main } from '../../pages/main';
import { Register, Login } from '../../pages/auth';

export const router = createBrowserRouter([
  {
    path: routes.main,
    element: <Main />,
  },
  {
    path: routes.register,
    element: <Register />,
  },
  {
    path: routes.login,
    element: <Login />,
  },
]);
