import styled from '@emotion/styled'

interface ListProps {
    markers: Array<any>
    setSelectPark: any;
    setPosition: (lat: number, lot: number) => void
    onClickMarker: (index: number) => void
}

export const List = ({ markers, setSelectPark, setPosition, onClickMarker }: ListProps) => {
    const handleClickParkingLot = (index: number) => {
        setSelectPark(index);
        onClickMarker(index);
        setPosition(markers[index].lat, markers[index].lot);
    }

    return <Container className='scroll-y'>
        {
            markers.map((marker, i) => {
                return <ItemContainer key={marker.id}>
                    <TitleWrap onClick={() => handleClickParkingLot(i)}>
                        <div className='title'>{marker.name}</div>
                        <div className='type'>{marker.division}</div>
                    </TitleWrap>
                    <AdreessContainer>
                        <div>{marker.locationAddress}</div>
                        <div>{marker.streetAddress}</div>
                    </AdreessContainer>
                    <TimeContainer>
                        <div>
                            <span>요금 :</span>
                            <Price price={marker.priceInformation}>{marker.priceInformation}</Price>
                        </div>
                        <div>
                            <span>요금 :</span>
                            <p>{marker.operatingDay}</p>
                        </div>
                    </TimeContainer>
                </ItemContainer>
            })
        }
    </Container>
}

const Container = styled.div`
    flex: 1 0 350px;
    height: 100%;
`;

const ItemContainer = styled.div`
    display:flex;
    flex-direction:column;
    height: 125px;
    padding:20px 20px;
    box-shadow: 0 2px 1px -2px gray;
    gap: 10px;
`;

const TitleWrap = styled.div`
    display: flex;
    gap: 5px;
    cursor: pointer;

    .title {
        font-size: 15px;
        font-weight: 500;
        color: #617fd9;
    }

   .type {
        font-size: 12px;
        font-weight: 500;
        line-height: normal;
        color: gray;
   }
`;

const AdreessContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 12px;
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 13px;
    margin-top: auto;
    gap: 5px;

    &>div{
        display: flex;
        gap: 5px;
    }
`;

const Price = styled.p<{ price: string }>`
    color: ${({ price }) => price === '유료' ? 'red' : 'black'};
`;