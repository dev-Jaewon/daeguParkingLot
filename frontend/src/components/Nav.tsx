import styled from '@emotion/styled';
import { BiCurrentLocation } from "react-icons/bi";
import { Loading } from './Loading';
import { SearchParkList } from '../types/SearchParkList';
import { Dispatch, SetStateAction } from 'react';

interface NavProps {
    setPosition: Dispatch<SetStateAction<SearchParkList>>
    isLoading: boolean,
    mapInstance?: naver.maps.Map
}

export const Nav = (props: NavProps) => {
    const handleCLickThisLocation = () => {
        if (!props.mapInstance) return;

        const {x, y} = props.mapInstance.getCenter();
        props.setPosition(preV => ({...preV, lat: y, lot: x}))
    }

    const handleClickMyLocation = () => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            if (!props.mapInstance) return;

            props.mapInstance.setCenter({ lat: coords.latitude, lng: coords.longitude })
        });
    }

    return (
        <Container>
            <>
                {
                    props.isLoading
                        ? <Loading />
                        : <SearchLocation onClick={handleCLickThisLocation}>현재 위치 조회</SearchLocation>
                }
            </>
            <Divider />
            <i onClick={handleClickMyLocation}>
                <BiCurrentLocation size={40} />
            </i>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content:center;
    width: 300px;
    height: 55px;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    margin-bottom: 50px;
    border-radius: 30px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    cursor: pointer;

    i {
        display: flex;
        justify-content: center;
        align-items:center;
        width: 50px;
        height: 50px;
        margin-left: 10px;
        margin-right: 15px;
    }
`

const SearchLocation = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.3rem;
    height: 100%;
`;

const Divider = styled.div`
    width: 1px;
    height:70%;
    border-left: 1px solid #dddddd;
`;