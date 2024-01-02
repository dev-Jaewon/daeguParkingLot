import { FocusMarker, Marker } from '../components/CustomMarker';
import { ParkingLot } from '../types/ParkingLot';

export class NaverMap {
    private markerInstance: Array<naver.maps.Marker>;
    private mapInstance: naver.maps.Map;

    public constructor(mapInstance: naver.maps.Map, markers: Array<ParkingLot>) {
        this.mapInstance = mapInstance;
        this.markerInstance = markers.map(marker => this.drawMarker(marker))
    }

    drawMarker({ lat, lot, name }: ParkingLot): naver.maps.Marker {
        const position = new naver.maps.LatLng(
            Number(lat),
            Number(lot)
        );

        return new naver.maps.Marker({
            position,
            map: this.mapInstance,
            icon: {
                content: Marker(name),
                anchor: new naver.maps.Point(20, 60)
            }
        })
    }

    focusMarkers(marker: naver.maps.Marker): void {
        this.markerInstance.forEach((m) => {
            const content = this.getContentFromMarker(m);

            if (m == marker) {
                m.setIcon({
                    content: FocusMarker(content),
                    anchor: new naver.maps.Point(20, 60)
                })
                m.setZIndex(100);
            } else {
                m.setIcon({
                    content: Marker(content),
                    anchor: new naver.maps.Point(20, 60)
                })
                m.setZIndex(99);
            }
        })
    }

    filterOutMarkers(): void {
        const mapBounds = this.mapInstance.getBounds() as naver.maps.LatLngBounds;

        for (const marker of this.markerInstance) {

            const position = marker.getPosition();

            if (mapBounds.hasLatLng(position)) {
                this.showMarker(marker);
            } else {
                this.hideMarker(marker);
            }
        }
    }

    clearMarker(){
        this.markerInstance.forEach(marker => marker.setMap(null));
    }

    private showMarker(marker: naver.maps.Marker): void {
        if (marker.getMap()) return;
        marker.setMap(this.mapInstance);
    }

    private hideMarker(marker: naver.maps.Marker): void {
        if (!marker.getMap()) return;
        marker.setMap(null);
    }

    private getContentFromMarker(marker: naver.maps.Marker): string {
        const content = (marker.getIcon() as naver.maps.HtmlIcon).content;

        if (typeof content !== 'string' || !content) return "";

        const value = content.match(/(?<=\<p>)(.*?)(?=<\/p>)/g);
        return value ? value[0] : "";
    }

    getMarkerInstance() {
        return this.markerInstance;
    }

}