import { useEffect, useState, RefObject, useRef, MutableRefObject } from 'react';

interface UseMapTypes {
    targetEle: RefObject<HTMLElement> | null;
}

export const useMap = (props: UseMapTypes) => {
    const mapInstance = useRef<naver.maps.Map>();
    const [center, setCenter] = useState({ lat: 0, lot: 0 });
    const [markers, setMarkers] = useState<Array<naver.maps.Marker>>([]);

    useEffect(() => {
        if (props.targetEle?.current) {
            const MapInstance = new naver.maps.Map(props.targetEle.current, {
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

    const handleDraged = () => changeLocation();

    const handleZoomChagne = () => changeLocation();

    const setMarker = (list: Array<any>) => {

        if (mapInstance.current) {
            const markerList = list.map(info => {
                return new naver.maps.Marker({
                    position: new naver.maps.LatLng(info.lat, info.lot),
                    map: mapInstance.current
                });
            });

            removeMarker();

            setMarkers(() => markerList);
        }
    }

    const removeMarker = () => {
        markers.forEach(marker => {
            marker.setMap(null);
        })
    }

    const changeLocation = () => {
        if (mapInstance.current) {
            const centerLocation = mapInstance.current.getCenter();
            setCenter({ lat: centerLocation.y, lot: centerLocation.x });
        }
    }

    return {
        setMarker,
        center
    }
}