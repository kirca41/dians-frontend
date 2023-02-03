import L from 'leaflet';

export const icon = new L.Icon({
    iconUrl: require('./marker-icon.png'),
    iconSize: [60, 60],
    iconAnchor:   [22, 94],
    popupAnchor:  [9, -90]
});