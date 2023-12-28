import { Dispatch, SetStateAction, forwardRef } from 'react';
import styled from '@emotion/styled';
import { ParkingLot } from '../types/ParkingLot';

interface ListProps {
    markers: Array<ParkingLot>
    setSelectPark: Dispatch<SetStateAction<number | null>>;
    setPosition: (lat: number, lot: number) => void
    onClickMarker: (index: number) => void
    isLoading: boolean
}

export const List = forwardRef(({ markers, setSelectPark, setPosition, onClickMarker, isLoading }: ListProps, ref: any) => {
    const handleClickParkingLot = (index: number) => {
        setSelectPark(index);
        onClickMarker(index);
        setPosition(Number(markers[index].lat), Number(markers[index].lot));
    }

    return <Container className='scroll-y'>
        {
            markers.length > 0 || !isLoading ?
                <>
                    {markers.map((marker, i) => {
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
                                    <span>요일 :</span>
                                    <p>{marker.operatingDay}</p>
                                </div>
                            </TimeContainer>
                        </ItemContainer>
                    })}
                    <ScrollTarget ref={ref} />
                </>
                :
                <div>로딩중</div>
        }
    </Container>
});

const Container = styled.div`
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

const ScrollTarget = styled.div`
`;