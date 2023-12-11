import { useEffect, useState, useRef } from 'react';

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