import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { getParkList } from './utils/api';
import { useMap } from './hooks/useMap';

function App() {
  const mapElement = useRef<HTMLDivElement | null>(null);

  const { center, setMarker } = useMap({ targetEle: mapElement });

  useEffect(() => {
    console.log(123)
    const call = async () => {
      const result = await getParkList({ lat: center.lat, lot: center.lot, radius: 10 });

      setMarker(result.data?.items.item);
    }

    call()
  }, [center]);

  return (
    <Container>
      <Map ref={mapElement}>
      </Map>
    </Container>
  )
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;