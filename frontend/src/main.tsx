import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'

import './styles/index.scss'
import './styles/common.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignUp } from './components/Signup.tsx';
import { Login } from './components/Login.tsx';
import styled from '@emotion/styled'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Container><RouterProvider router={router} /></Container>
  </QueryClientProvider>
);

