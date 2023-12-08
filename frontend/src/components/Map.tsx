import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMap } from '../hooks/useMap';

interface MapProps {
    markers: any;
    setLocation: any;
}

export const Map = ({ markers, setLocation }: MapProps) => {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const { location } = useMap({ targetEle: mapElement, markers });

    return <Container ref={mapElement}>
    </Container>
}

const Container = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`;