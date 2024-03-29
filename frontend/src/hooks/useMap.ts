import { useEffect, useState, useRef } from 'react';
import { DEFAULT_LOCATION } from '../Constant';
import { ParkingLot } from '../types/ParkingLot';
import { NaverMap } from '../utils/NaverMap';
import { CLUSTER_OPTIONS } from '../Constant';
import { Cluster_1, Cluster_2 } from '../components/atoms/Cluster';
import { MarkerClusteringOptions, MarkerClusteringWrapper } from '../utils/MarkerClusteringWrapper';

interface UseMapTypes {
    markers: Array<ParkingLot>
}

export const useMap = ({ markers }: UseMapTypes) => {
    const targetEle = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<naver.maps.Map>();
    const cluster = useRef<MarkerClusteringWrapper | null>(null)

    const [onFocusMarkerId, setOnFocusMarkerId] = useState<number>()
    const [onChangeZoom, setOnChangZoom] = useState<number>();

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
        if (!mapInstance.current) return

        const events: Array<naver.maps.MapEventListener> = [];

        let map = new NaverMap(mapInstance.current, markers);

        const idleEvent = naver.maps.Event.addListener(mapInstance.current, 'idle', () => map.filterOutMarkers());
        events.push(idleEvent);

        for (const [i, marker] of map.getMarkerInstance().entries()) {
            const clickEvent = naver.maps.Event.addListener(marker, 'click', async () => {
                map.focusMarkers(marker);
                setOnFocusMarkerId(markers[i].id);
            })

            events.push(clickEvent);
        }

        cluster.current = createCluster(map);

        if (!map.checkRenderMarker() && map.getMarkerInstance().length > 0) {
            const marker = map.getMarkerInstance()[0];

            mapInstance.current.panTo(marker.getPosition());
        }

        const zoomChangeEvent = naver.maps.Event.addListener(mapInstance.current, 'zoom_changed', (zoom) => setOnChangZoom(zoom));
        events.push(zoomChangeEvent);

        return () => {
            naver.maps.Event.removeListener(events);

            if(cluster.current){
                cluster.current.markerClustering.onRemove();
                cluster.current.markerClustering.setMarkers([]);
            }


            map.clearMarker();
        }

    }, [markers])

    const createCluster = (map: NaverMap) => {
        const option: MarkerClusteringOptions = {
            ...CLUSTER_OPTIONS,
            map: map.getMapInstance(),
            icons: [Cluster_1, Cluster_2],
            indexGenerator: [20, 50],
            markers: map.getMarkerInstance(),
            stylingFunction: (clusterMarker, count) => {
                if(!clusterMarker) return;

                const container = clusterMarker.getElement();
                const contentElement = container.querySelector(".content") as HTMLDivElement;

                contentElement.textContent = String(count);
            }
        }

        return new MarkerClusteringWrapper(naver, option);
    }

    return {
        targetEle,
        mapInstance,
        onFocusMarkerId,
        onChangeZoom
    }
}