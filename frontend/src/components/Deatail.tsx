import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { MdLocationOn, MdAccessTimeFilled, MdMessage } from "react-icons/md";
import { IoPricetag } from "react-icons/io5";
import { Reviews } from './Reviews';
import { ParkingLot } from '../types/ParkingLot';
import { getDetailInfo } from '../utils/api';

interface DetailProps {
    info: ParkingLot,
    parkingLotId?: string
}

export const Detail = ({ info, parkingLotId }: DetailProps) => {
    // const { data } = useQuery({
    //     queryKey: ['detail'], queryFn: () => getDetailInfo(parkingLotId)
    // });

    return <Container className='scroll-y'>
        <Header>
            <div />
            <Title>{info.name}</Title>
        </Header>
        {info.locationAddress && <Info>
            <MdLocationOn size={'20px'} />
            <p>{info.locationAddress}</p>
        </Info>}
        {info.streetAddress && <Info>
            <MdLocationOn size={'20px'} />
            <p>{info.streetAddress}</p>
        </Info>}
        {info.operatingDay && <Info>
            <MdAccessTimeFilled size={'20px'} />
            <p>{info.operatingDay.replace(/\+/, ", ") + " 이용가능"}</p>
        </Info>}
        <DetailInfo>
            <span>평일 :</span>
            <p>{info.operatingStartTime}~{info.operatingEndTime}</p>
        </DetailInfo>
        <DetailInfo>
            <span>주말 :</span>
            <p>{info.operatingSatStartTime}~{info.operatingSatEndTime}</p>
        </DetailInfo>
        <DetailInfo>
            <span>공휴일 :</span>
            <p>{info.operatingHolidayStartTime}~{info.operatingHolidayEndTime}</p>
        </DetailInfo>
        <Divider />
        <Price>
            <IoPricetag size={'20px'} />
            <span>요금 : {info.priceInformation}</span>
        </Price>
        <DetailInfo>
            <span>기본시간 :</span>
            <p>{info.basicTime} 분</p>
        </DetailInfo>
        <DetailInfo>
            <span>기본요금 :</span>
            <p>{info.nomalPrice} 원</p>
        </DetailInfo>
        <DetailInfo>
            <span>추가요금 :</span>
            <p>{info.perTime}분당 {info.perPrice} 원</p>
        </DetailInfo>
        {info.dayPrice > 0 && <DetailInfo>
            <span>일일 요금 :</span>
            <p>{info.dayPrice} 원</p>
        </DetailInfo>}
        {info.regularPrice > 0 && <DetailInfo>
            <span>정기권 요금 :</span>
            <p>{info.regularPrice} 원</p>
        </DetailInfo>}
        {info.payment &&
            <DetailInfo>
                <span>결제방법 :</span>
                <p>{info.payment.replace(/\+/, ", ")}</p>
            </DetailInfo>
        }
        <Divider />
        <Info>
            <MdMessage size={'20px'} />
            <p>기타사항</p>
        </Info>
        {info.otherMatters && <DetailInfo>
            <span>-</span>
            <p>{info.otherMatters.replace(/\+/, ", ")}</p>
        </DetailInfo>}
        <DetailInfo>
            <span>- 관리기관 :</span>
            <p>{info.managementAgency}</p>
        </DetailInfo>
        <DetailInfo>
            <span>- 문의번호 :</span>
            <p>{info.telNumber}</p>
        </DetailInfo>
        <DetailInfo>
            <span>- 업데이트 날짜 :</span>
            <p>{info.updatedAt}</p>
        </DetailInfo>
        <AricleEnd />
        <Reviews />
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: #09090940 -2px 0px 5px;
    z-index: 1;
`;

const Header = styled.div`
    position: relative;
    margin-bottom: 20px;

    div {
        width: 100%;
        height: 250px;
        background-color: #f5f5f5;
    }
`;

const Title = styled.h1`
    position: absolute;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #212121;
    padding: 10px 20px;
    bottom: 0px;
    background-color: white;
`;

const Info = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
    padding-left: 20px;

    p {
        font-size: 1.2rem;
    }
`;

const Divider = styled.div`
    margin-top: 50px;
`;

const Price = styled.div`
    display: flex;
    gap: 10px;
    padding-left: 20px;
    font-size: 1.2rem;
`;

const DetailInfo = styled.div`
    display: flex;
    padding-left: 50px;
    font-size: 1rem;
    gap: 5px;
    line-height: 25px;
`;

const AricleEnd = styled.div`
    padding-top: 30px;
    height: 1px;
    width: 100%;
    box-shadow: rgb(33 35 38) 0px 10px 10px -13px;
`;

