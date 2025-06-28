# Klimakarte

Visualisierung von Klimadaten auf einer interaktiven Karte mit Leaflet, MarkerCluster und Chart.js.

## 📋 Inhalt

- **Interaktive Karte** basierend auf [Leaflet](https://leafletjs.com/)
- **Clustering von Markern** (MarkerCluster)
- **Geocoding** und zusätzliche Leaflet-Plugins
- **Diagramme** mit Chart.js
- **Eigenes Styling** via CSS
- **AJAX-Datenladen** mit jQuery

---

## 🚀 Verwendete Bibliotheken

Folgende Libraries und Plugins werden eingebunden:

### Leaflet

- [Leaflet](https://unpkg.com/leaflet@1.9.4)
- [Leaflet.markercluster](https://unpkg.com/leaflet.markercluster@1.5.3)
- [Leaflet.Control.Geocoder](https://unpkg.com/leaflet-control-geocoder)
- [Leaflet.GraphicScale](https://cdn.jsdelivr.net/npm/leaflet-graphicscale)
- [Leaflet.MousePosition](https://unpkg.com/leaflet-mouse-position@1.0.3)
- [Leaflet.ZoomHome](https://cdn.jsdelivr.net/npm/leaflet.zoomhome)
- [Leaflet.Fullscreen](https://cdn.jsdelivr.net/npm/leaflet.fullscreen)
- [Leaflet.Hash](https://cdn.jsdelivr.net/npm/leaflet-hash)

### Charting

- [Chart.js](https://cdn.jsdelivr.net/npm/chart.js)

### jQuery

- [jQuery 3.7.1](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js)

### Icons

- [Font Awesome 4.7](http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0)

---

### 🖥️ Screenshot

![Calc](./screenshot.png "Calc")

---

## 🗂️ Projektstruktur

<pre><code> 
./
├── docker-compose.yml
├── logs
├── processed
│   ├── measurements
│   └── stations
├── README.MD
├── screenshot.png
├── updater
│   ├── clearStationen.py
│   ├── createArray4DataNames.py
│   ├── createGEOJSON.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── update.sh
└── web
    ├── default.conf
    ├── Dockerfile
    └── site
        ├── css
        │   └── style.css
        ├── index.html
        └── js
            ├── array4DataNames.js
            ├── chartHandler.js
            ├── ConvKlimaStat.geojson
            ├── ConvKlimaStat.js
            ├── iso8601.min.js
            ├── mapInit.js
            └── stationHandlers.js
</code></pre>


