import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getParkList } from './utils/api';
import { List } from './components/List';
import { useMap } from './hooks/useMap';

function App() {
  const [locationTrigger, setLocationTrigger] = useState<any>();
  const { data } = useQuery<any>({ queryKey: ['markers', locationTrigger], queryFn: () => getParkList(location), initialData: [] });
  const { targetEle, location } = useMap({ markers: data });

  useEffect(() => { 
    setLocationTrigger(location);
  }, [location])

  return (
    <Container>
      <Map ref={targetEle} />
      <List markers={data}/>
    </Container>
  )
}

export default App;

const Container = styled.div`
  display:flex;
  width: 100%;
  height: 100vh;
`;

const Map = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`;