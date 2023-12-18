import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from './App.tsx'

import './styles/index.scss'
import './styles/common.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Auth } from './pages/auth.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/auth",
        element: <Auth />,
      },
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
    </QueryClientProvider>
);
