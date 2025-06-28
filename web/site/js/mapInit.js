const map = L.map('map', {
    zoomControl: false,
    attributionControl: true
}).setView([51.124, 8.965], 5);

// Geocoder
L.Control.geocoder({
    defaultMarkGeocode: true,
    collapsed: false,
    position: 'topright'
}).addTo(map);

L.control.mousePosition({
    position: 'bottomleft',
    numDigits: 5,
    prefix: "Koordinaten:"
}).addTo(map);

L.Control.zoomHome().addTo(map);

L.control.fullscreen({
    title: { 'false': 'Vollbild anzeigen', 'true': 'Vollbild schließen' }
}).addTo(map);

L.control.graphicScale({
    fill: 'hollow',
    position: 'bottomleft'
}).addTo(map);

new L.Hash(map);

// Attribution
map.attributionControl.setPrefix(
    '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
);

// Hintergrundkarte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
}).addTo(map);
