import { useEffect, useState, useRef } from 'react';
import { PER_RANGE } from '../Constant';

interface UseMapTypes {
    markers: Array<any>
}

const DEFAULT_LOCATION = {
    lat: 35.87093386685083,
    lot: 128.59394073486328
}

export const useMap = (props: UseMapTypes) => {
    const targetEle = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<naver.maps.Map>();
    const [location, setLocation] = useState({ ...DEFAULT_LOCATION, range: 500 });
    const [markerIns, setMarkerIns] = useState<Array<naver.maps.Marker>>([]);

    useEffect(() => {
        if (targetEle?.current) {
            const MapInstance = new naver.maps.Map(targetEle.current, {
                center: new naver.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lot),
                zoom: 17,
                zoomControl: true,
                zoomControlOptions: {
                    position: naver.maps.Position.TOP_RIGHT
                },
            });

            mapInstance.current = MapInstance;
        }

        let zoomListener: naver.maps.MapEventListener | null = null;

        if (mapInstance.current) {
            mapInstance.current.addListener('zoom_changed', handleZoomChagne);
        }

        return () => {
            if (zoomListener) mapInstance.current?.removeListener(zoomListener);
        }

    }, [])

    useEffect(() => {
        if (mapInstance.current) {
            const markerInsList = props.markers.map(info => {
                return new naver.maps.Marker({
                    position: new naver.maps.LatLng(info.lat, info.lot),
                    map: mapInstance.current
                });
            });

            removeMarker();

            setMarkerIns(() => markerInsList);
        }
    }, [props.markers])

    const handleZoomChagne = (zoom: number) => {
        if (zoom >= 16) {
            setLocation(v => ({ ...v, range: PER_RANGE[16] }));
        } else if (zoom <= 11) {
            setLocation(v => ({ ...v, range: PER_RANGE[11] }));
        } else {
            setLocation(v => ({ ...v, range: PER_RANGE[zoom as keyof typeof PER_RANGE] }));
        }
    }

    const setPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            mapInstance.current?.setCenter(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
        });
    }

    const removeMarker = () => {
        markerIns.forEach(marker => {
            marker.setMap(null);
        })
    }

    const onChangeLocation = () => {
        if (mapInstance.current) {
            const { x, y } = mapInstance.current.getCenter();
            setLocation((prevalue) => ({ ...prevalue, lat: y, lot: x }));
        }
    }

    return {
        targetEle,
        location,
        setPosition,
        onChangeLocation
    }
}