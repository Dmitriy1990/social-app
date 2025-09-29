import { createRoot } from 'react-dom/client';
import './app/styles/main.scss';
import App from './app/App.tsx';
import { MainProvider } from './app/providers/MainProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <MainProvider>
    <App />
  </MainProvider>,
);
