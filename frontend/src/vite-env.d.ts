/// <reference types="vite/client" />

declare interface MarkerClusteringOptions {
    map: naver.maps.Map;
    markers: naver.maps.Marker[];
    disableClickZoom?: boolean;
    minClusterSize?: number;
    maxZoom?: number;
    gridSize?: number;
    icons?: naver.maps.Icon[];
    indexGenerator?: Array<number>
    averageCenter?: boolean;
    stylingFunction?: (cluster: naver.maps.Marker, count: string) => void;
}


declare class MarkerClustering {
    constructor(options?: MarkerClusteringOptions);
}