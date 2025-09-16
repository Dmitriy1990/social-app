import { createBrowserRouter } from 'react-router-dom';
import { routes } from '../../shared/api/routes';
import { Main } from '../../pages/main';

export const router = createBrowserRouter([
  {
    path: routes.main,
    element: <Main />,
  },
]);
