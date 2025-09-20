import { createRoot } from 'react-dom/client';
import './app/styles/main.scss';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
