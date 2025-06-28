from geojson import Point, Feature, FeatureCollection, dump
import sys
import os
import re
import csv

input_path = "/data/stations"
output_path = "/web/site/js"

# Ins Input-Verzeichnis wechseln
os.chdir(input_path)
print("Arbeitsverzeichnis:", os.getcwd())

features = []

# ConvKlimaStat.txt einlesen
with open("ConvKlimaStat.txt", "r") as file1:
    reader = csv.reader(file1, delimiter=';')
    for i, row in enumerate(reader):
        if i < 2:
            continue  # Erste zwei Zeilen überspringen

        # Robust Koordinaten parsen
        try:
            x = float(re.sub(r"[^0-9\.-]", "", row[2]))
            y = float(re.sub(r"[^0-9\.-]", "", row[3]))
        except Exception as e:
            print(f"Fehler beim Parsen der Koordinaten in Zeile {i}: {e}")
            continue

        point = Point((y, x))

        feature = Feature(
            geometry=point,
            properties={
                "StationsID": re.sub(r"[\n\t\s]*", "", row[0]),
                "Hoehe": re.sub(r"[\n\t\s]*", "", row[1]),
                "Ort": re.sub(r"[\n\t\s]*", "", row[4]),
                "Stationsname": re.sub(r"[\n\t\s]*", "", row[5])
            }
        )
        features.append(feature)

# FeatureCollection erzeugen
feature_collection = FeatureCollection(features)

os.chdir(output_path)

# Als JavaScript speichern
with open("ConvKlimaStat.js", "w") as f_js:
    f_js.write("var stationen = ")
    dump(feature_collection, f_js)

# Als GeoJSON speichern
with open("ConvKlimaStat.geojson", "w") as f_geojson:
    dump(feature_collection, f_geojson)

print("GeoJSON-Dateien erfolgreich erstellt.")
