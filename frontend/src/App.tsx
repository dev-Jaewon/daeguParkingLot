import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getParkList } from './utils/api';
import { List } from './components/List';
import { useMap } from './hooks/useMap';
import { Detail } from './components/Deatail';
import { Nav } from './components/Nav';

function App() {
  // const [selectPark, setSelectPark] = useState<number | null>(null);
  const [locationTrigger, setLocationTrigger] = useState<any>();
  const { data } = useQuery<any>({ queryKey: ['markers', locationTrigger], queryFn: () => getParkList(locationTrigger), initialData: [] });
  const { mapInstance, targetEle, location, focusParkingLot, setPosition, onChangeLocation, onClickMarker, setFocusParkingLot } = useMap({ markers: data });

  useEffect(() => {
    setLocationTrigger(location);
    setFocusParkingLot(null);
  }, [location.lat, location.lot])

  useEffect(() => {
    mapInstance.current?.autoResize();
  }, [focusParkingLot])

  return (
    <Container>
      <MapContainer>
        <Map ref={targetEle} />
        <Nav setPosition={setPosition} onChangeLocation={onChangeLocation} />
      </MapContainer>
      {
        focusParkingLot !== null && <Detail info={data[focusParkingLot]} />
      }
      <List markers={data} setSelectPark={setFocusParkingLot} setPosition={setPosition} onClickMarker={onClickMarker} />
    </Container >
  )
}

export default App;

const Container = styled.div`
  display:flex;
  width: 100%;
  height: 100vh;
  user-select:none
`;

const MapContainer = styled.div`
  position: relative;
  display:flex;
  width: 100%;
  height: 100%;

  .markerOverlay {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    width: 60px;
    padding: 10px 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    margin-bottom: 5px;
    background: #000000b5;
    padding: 10px 20px;
    color: white;
  }
`

const Map = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`;