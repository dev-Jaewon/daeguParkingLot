import { useEffect, useState, useRef } from 'react';
import { DEFAULT_LOCATION } from '../Constant';
import { ParkingLot } from '../types/ParkingLot';
import { NaverMap } from '../util/NaverMap';
import { CLUSTER_OPTIONS } from '../Constant';
import { Cluster_1, Cluster_2 } from '../components/Cluster';

interface UseMapTypes {
    markers: Array<ParkingLot>
}

export const useMap = ({ markers }: UseMapTypes) => {
    const targetEle = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<naver.maps.Map>();
    const cluster = useRef<MarkerClustering | null>(null)

    const [onFocusMarkerId, setOnFocusMarkerId] = useState<number>()

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

        const clickEvents: Array<naver.maps.MapEventListener> = [];

        let map = new NaverMap(mapInstance.current, markers);

        const idleEvent = naver.maps.Event.addListener(mapInstance.current, 'idle', () => map.filterOutMarkers());

        for (const [i, marker] of map.getMarkerInstance().entries()) {
            const clickEvent = naver.maps.Event.addListener(marker, 'click', async () => {
                map.focusMarkers(marker);
                setOnFocusMarkerId(markers[i].id);
            })

            clickEvents.push(clickEvent);
        }

        cluster.current = createCluster(map);

        if (!map.checkRenderMarker() && map.getMarkerInstance().length > 0) {
            const marker = map.getMarkerInstance()[0];

            mapInstance.current.panTo(marker.getPosition());
        }

        return () => {
            naver.maps.Event.removeListener([idleEvent, ...clickEvents]);

            cluster.current?.onRemove();
            cluster.current?.setMarkers([]);

            map.clearMarker();
        }

    }, [markers])

    const createCluster = (map: NaverMap) => {
        return new MarkerClustering({
            ...CLUSTER_OPTIONS,
            map: map.getMapInstance(),
            icons: [Cluster_1, Cluster_2],
            indexGenerator: [20, 50],
            markers: map.getMarkerInstance(),
            stylingFunction: (clusterMarker, count) => {
                const container = clusterMarker.getElement();
                const contentElement = container.querySelector(".content") as HTMLDivElement;

                contentElement.textContent = count;
            }
        });
    }

    return {
        targetEle,
        mapInstance,
        onFocusMarkerId
    }
}