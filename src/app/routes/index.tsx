import { createBrowserRouter } from 'react-router-dom';
import { routes } from '../../shared/api/routes';
import { MainLayout } from '../../shared/ui/mainLayout';

export const router = createBrowserRouter([
  {
    path: routes.main,
    element: <MainLayout />,
  },
]);
