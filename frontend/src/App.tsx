import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getParkList } from './utils/api';
import { List } from './components/List';
import { useMap } from './hooks/useMap';
import { Detail } from './components/Deatail';

function App() {
  const [selectPark, setSelectPark] = useState<number | null>(null);
  const [locationTrigger, setLocationTrigger] = useState<any>();
  const { data } = useQuery<any>({ queryKey: ['markers', locationTrigger], queryFn: () => getParkList(locationTrigger), initialData: [] });
  const { targetEle, location } = useMap({ markers: data });

  useEffect(() => {
    setLocationTrigger(location);
    setSelectPark(null);
  }, [location])

  return (
    <Container>
      <MapContainer>
        <Map ref={targetEle} />
      </MapContainer>
      {
        selectPark !== null && <Detail info={data[selectPark]} />
      }
      <List markers={data} setSelectPark={setSelectPark} />
    </Container >
  )
}

export default App;

const Container = styled.div`
  display:flex;
  width: 100%;
  height: 100vh;
`;

const MapContainer = styled.div`
  position: relative;
  display:flex;
  width: 100%;
  height: 100%;
`

const Map = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`;