import { useEffect, useState, useRef } from 'react';
import { PER_RANGE, DEFAULT_LOCATION } from '../Constant';
import { ParkingLot } from '../types/ParkingLot';
import { FocusMarker, Marker } from '../components/CustomMarker';

interface UseMapTypes {
    markers: Array<ParkingLot>
}

export const useMap = ({ markers }: UseMapTypes) => {
    const targetEle = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<naver.maps.Map>();
    const [location, setLocation] = useState(DEFAULT_LOCATION);
    const [markerIns, setMarkerIns] = useState<Array<naver.maps.Marker>>([]);
    const [markerClickEvents, setMarkerClickEvents] = useState<Array<naver.maps.MapEventListener>>();
    const [focusParkingLot, setFocusParkingLot] = useState<number | null>(null)

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
        if (!mapInstance.current) return;
        const markerInsList = <Array<naver.maps.Marker>>[];

        for (let marker of markers) {
            markerInsList.push(createMarkerInstance(Number(marker.lat), Number(marker.lot), marker.name));
        }

        clearMarkerForMap();
        setMarkerIns(markerInsList);
    }, [markers])

    useEffect(() => {
        const markerClickEvents = <Array<naver.maps.MapEventListener>>[];

        for (let i = 0; i < markerIns.length; i++) {
            markerClickEvents.push(
                naver.maps.Event.addListener(markerIns[i], 'click', () => onClickMarker(i))
            )
        }

        clearMarkerClickEvent();
        setMarkerClickEvents(markerClickEvents);
    }, [markerIns])

    const onClickMarker = (index: number) => {
        if (!mapInstance.current) return;

        markerIns.forEach((marker, i) => {
            const name = markers[i].name;

            if (i === index) {
                marker.setIcon({
                    content: FocusMarker(name),
                    anchor: new naver.maps.Point(20, 60)
                })
            } else {
                marker.setIcon({
                    content: Marker(name),
                    anchor: new naver.maps.Point(20, 60)
                })
            }
        })
    }

    const createMarkerInstance = (lat: number, lot: number, name: string) => {
        return new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lot),
            map: mapInstance.current,
            icon: {
                content: Marker(name),
                anchor: new naver.maps.Point(20, 60)
            }
        })
    }

    const handleZoomChagne = (zoom: number) => {
        if (zoom >= 16) {
            setLocation(v => ({ ...v, range: PER_RANGE[16] }));
        } else if (zoom <= 11) {
            setLocation(v => ({ ...v, range: PER_RANGE[11] }));
        } else {
            setLocation(v => ({ ...v, range: PER_RANGE[zoom as keyof typeof PER_RANGE] }));
        }
    }

    const setPosition = (lat: number, lot: number) => {

        mapInstance.current?.setCenter(new naver.maps.LatLng(lat, lot));
    }

    const onChangeLocation = () => {
        if (mapInstance.current) {
            const { x, y } = mapInstance.current.getCenter();
            setLocation((prevalue) => ({ ...prevalue, lat: y, lot: x }));
        }
    }

    const clearMarkerClickEvent = () => {
        markerClickEvents?.forEach(event => mapInstance.current?.removeListener(event));
    }

    const clearMarkerForMap = () => {
        markerIns.forEach(marker => marker.setMap(null));
    }

    return {
        targetEle,
        location,
        setPosition,
        onChangeLocation,
        onClickMarker,
        mapInstance,
        focusParkingLot,
        setFocusParkingLot
    }
}