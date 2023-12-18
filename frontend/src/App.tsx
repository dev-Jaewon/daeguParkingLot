import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { List } from './components/List';
import { useMap } from './hooks/useMap';
import { Detail } from './components/Deatail';
import { Nav } from './components/Nav';
import { Logo } from './components/Logo';
import { SearchBar } from './components/SearchBar';
import { IoIosArrowForward } from "react-icons/io";
import { SearchParkList } from './types/SearchParkList';
import { useIntersect } from './hooks/useIntercepter';
import { useSearchQuery } from './hooks/useQuery';
import { DEFAULT_INFO, DEFAULT_LOCATION } from './Constant';

function App() {
  const [locationTrigger, setLocationTrigger] = useState<SearchParkList>({
    ...DEFAULT_LOCATION, ...DEFAULT_INFO
  });

  const { data, isLoading } = useSearchQuery(locationTrigger);

  const { mapInstance, targetEle, location, focusParkingLot, setPosition, onChangeLocation, onClickMarker, setFocusParkingLot } = useMap({ markers: data?.markers || [] });

  const { ref } = useIntersect(() => {
    if (isLoading) return;

    setLocationTrigger(preV => ({ ...preV, page: preV.page + 1 }));
  }, 0.1);

  useEffect(() => {
    setLocationTrigger(() => ({...location, ...DEFAULT_INFO }));
    setFocusParkingLot(null);
  }, [location.lat, location.lot])

  useEffect(() => {
    mapInstance.current?.autoResize();
  }, [focusParkingLot])

  const handleClickCloseDetail = () => {
    setFocusParkingLot(null);
  }

  return (
    <Container>
      <MapContainer>
        <Map ref={targetEle} />
        <Nav setPosition={setPosition} onChangeLocation={onChangeLocation} isLoading={isLoading} />
      </MapContainer>
      {
        focusParkingLot !== null && data && <DetailContainer>
          <CloseButton onClick={handleClickCloseDetail}>
            <IoIosArrowForward size={60} />
          </CloseButton>
          <Detail info={data.markers[focusParkingLot]} />
        </DetailContainer>
      }
      <SideContainer>
        <Logo />
        <SearchBar setLocationTrigger={setLocationTrigger} />
        <ResultCount>총 {data?.size}개의 검색 결과가 있습니다.</ResultCount>
        <List isLoading={isLoading} markers={data?.list || []} setSelectPark={setFocusParkingLot} setPosition={setPosition} onClickMarker={onClickMarker} ref={ref} />
      </SideContainer>
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

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 350px;
`;

const ResultCount = styled.div`
    padding: 10px 15px;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px;
`;

const DetailContainer = styled.div`
  position: relative;
  flex: 1 0 450px;
`;

const CloseButton = styled.div`
  position: absolute;
  top:50%;
  background-color: white;
  right: 98%;
  box-shadow: rgba(0, 0, 0, 0.15) -5.6px 3.4px 6.2px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  cursor: pointer;
`;