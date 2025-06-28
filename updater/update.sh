#!/bin/bash
set -e

echo "$(date) - Update gestartet"

rm -rf /data/measurements/*
rm -rf /data/stations/*
mkdir -p /data/measurements
mkdir -p /data/stations

cd /data/measurements

wget -r --no-parent --reject "index.html*" -nd -Nc -e robots=off -A "jahreswerte_*2024*,*.txt" \
    https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/annual/kl/historical/

mv KL_Jahreswerte_Beschreibung_Stationen.txt /data/stations
iconv -f ISO-8859-1 -t UTF-8//TRANSLIT /data/stations/KL_Jahreswerte_Beschreibung_Stationen.txt \
    -o /data/stations/stationen.txt

for i in *.zip; do unzip "$i" "produkt_klima_jahr*.txt"; done
for i in *.txt; do mv "$i" "${i%.*}.csv"; done
rm -f *.zip

/usr/local/bin/python3 /app/createArray4DataNames.py
/usr/local/bin/python3 /app/clearStationen.py
/usr/local/bin/python3 /app/createGEOJSON.py
