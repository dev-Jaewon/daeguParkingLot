import { useEffect, useState, RefObject, useRef } from 'react';

interface UseMapTypes {
    markers: Array<any>
}

export const useMap = (props: UseMapTypes) => {
    const targetEle = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<naver.maps.Map>();
    const [location, setLocation] = useState({ lat: 0, lot: 0, radius: 13 });
    const [markerIns, setMarkerIns] = useState<Array<naver.maps.Marker>>([]);

    useEffect(() => {
        if (targetEle?.current) {
            const MapInstance = new naver.maps.Map(targetEle.current, {
                center: new naver.maps.LatLng(35.8456644052076, 128.61277893156978),
                zoom: 13,
                zoomControl: true,
                zoomControlOptions: {
                    position: naver.maps.Position.TOP_RIGHT
                },
            });

            mapInstance.current = MapInstance;
        }

        let initListener: naver.maps.MapEventListener | null = null;
        let moveListener: naver.maps.MapEventListener | null = null;
        let zoomListener: naver.maps.MapEventListener | null = null;

        if (mapInstance.current) {
            initListener = mapInstance.current.addListener('init', setLocationCenter);
            moveListener = mapInstance.current.addListener('dragend', handleDraged);
            mapInstance.current.addListener('zoom_changed', handleZoomChagne);
        }

        return () => {
            if (initListener) mapInstance.current?.removeListener(initListener);
            if (moveListener) mapInstance.current?.removeListener(moveListener);
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

    const setLocationCenter = () => {
        const locationBtnHtml = '<a href="#" class="btn_mylct"><span class="spr_trff spr_ico_mylct">NAVER 그린팩토리</span></a>';
        const customControl = new naver.maps.CustomControl(locationBtnHtml, {
            position: naver.maps.Position.TOP_RIGHT
        });

        customControl.setMap(mapInstance.current);

        naver.maps.Event.addDOMListener(customControl.getElement(), 'click', () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                mapInstance.current?.setCenter(new naver.maps.LatLng(lat, lon));
            });
        });
    }

    const handleDraged = () => onChangeLocation();

    const handleZoomChagne = () => onChangeLocation();

    // const setMarker = (list: Array<any>) => {

    //     // if (mapInstance.current) {
    //     //     const markerList = list.map(info => {
    //     //         return new naver.maps.Marker({
    //     //             position: new naver.maps.LatLng(info.lat, info.lot),
    //     //             map: mapInstance.current
    //     //         });
    //     //     });

    //     //     removeMarker();

    //     //     setMarkers(() => markerList);
    //     // }
    // }

    const removeMarker = () => {
        markerIns.forEach(marker => {
            marker.setMap(null);
        })
    }

    // const changeLocation = () => {
    //     if (mapInstance.current) {
    //         const { x, y } = mapInstance.current.getCenter();
    //         setCenter((prevalue) => ({ ...prevalue, lat: y, lot: x }));
    //     }
    // }

    const onChangeLocation = () => {
        if (mapInstance.current) {
            const { x, y } = mapInstance.current.getCenter();
            setLocation((prevalue) => ({ ...prevalue, lat: y, lot: x }));
        }
    }

    return {
        targetEle,
        location
    }
}