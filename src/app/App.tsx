import { RouterProvider } from 'react-router-dom';
import { MainLayout } from '../shared/ui';
import { router } from './routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
