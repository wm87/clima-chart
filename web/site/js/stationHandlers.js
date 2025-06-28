// stationHandlers.js

// Merkt den aktuell aktiven Marker
let activeLayer = null;

// Mouseover-Highlight
function ObjektHervorheben(e) {
    const layer = e.target;
    // Nur hervorheben, wenn nicht aktiv
    if (layer !== activeLayer) {
        layer.setStyle({ weight: 2, color: '#666', fillOpacity: 0.7 });
    }
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    infoControl.update(layer.feature.properties);
}

// Mouseout-Reset (nur wenn nicht aktiv)
function StyleZurucksetzen(e) {
    const layer = e.target;
    if (layer !== activeLayer) {
        geojson.resetStyle(layer);
    }
    infoControl.update();
}

// Daten laden und Chart rendern
function loadChartData(stationID) {
    const file = array4DataNames.find(name =>
        name.slice(0, -4).endsWith(stationID)
    );

    if (file) {
        $.get("/measurements/" + file)
            .done(renderChart)
            .fail(xhr => alert(`Error ${xhr.status}: ${xhr.statusText}`));
    } else {
        if (chart) chart.destroy();
        chart = null;
        document.getElementById('status').innerHTML = '<p><b>Keine Daten vorhanden!</b></p>';
    }
}

// Klick-Handler: aktiviert den Marker
function ZeichneChart(e) {
    document.getElementById('status').innerHTML = '';

    // Vorher aktiven Marker zurücksetzen
    if (activeLayer) {
        geojson.resetStyle(activeLayer);
    }

    // Diesen als aktiv speichern
    activeLayer = e.target;

    // Dauerhaft hervorheben
    activeLayer.setStyle({
        weight: 3,
        color: 'black',
        fillOpacity: 1
    });

    // Daten laden
    const id = e.target.feature.properties.StationsID.toString().padStart(5, "0");
    loadChartData(id);
}

// Handler pro Feature
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: ObjektHervorheben,
        mouseout: StyleZurucksetzen,
        click: ZeichneChart
    });
}

// Info-Fenster Control
const infoControl = L.control({ position: 'bottomright' });
infoControl.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
infoControl.update = function (props) {
    this._div.innerHTML = '<h4>Klimastationen BRD</h4>' +
        (props ? `
      <b>${props.Stationsname}</b><br/>
      Höhe: ${props.Hoehe}<br/>
      Ort: ${props.Ort}<br/>
      ID: ${props.StationsID}`
            : 'Maus über eine Station bewegen');
};
infoControl.addTo(map);

// GeoJSON & Cluster-Setup
map.createPane('pane_messort');
const geojson = L.geoJson(stationen, {
    pane: 'pane_messort',
    style: {
        fillColor: 'red',
        weight: 1,
        opacity: 1,
        color: '#333',
        fillOpacity: 0.8
    },
    onEachFeature,
    pointToLayer: (f, latlng) => L.circleMarker(latlng)
});

L.markerClusterGroup({
    showCoverageOnHover: true,
    spiderfyDistanceMultiplier: 2,
    maxZoom: map.getMaxZoom() || 19
})
    .addLayer(geojson)
    .addTo(map);
