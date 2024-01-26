import ReactDOM from 'react-dom/client'

import './styles/index.scss'
import './styles/common.scss'

import styled from '@emotion/styled'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CustomRouter } from './route/CustomRouter.tsx';
import { history } from './history.ts';
import { RouteList } from './route/Routes.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CustomRouter  history={history}>
      <Container>
        {RouteList()}
      </Container>
    </CustomRouter>
  </QueryClientProvider>
);

