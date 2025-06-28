import re
import os

input_dir = "/data/stations"
input_file = os.path.join(input_dir, "stationen.txt")

output_dir = "/data/stations"
output_file = os.path.join(output_dir, "ConvKlimaStat.txt")

# Datei schreiben
with open(output_file, "w", encoding="utf-8") as new_file:
    with open(input_file, "r", encoding="utf-8", errors="surrogateescape") as file1:
        for i, line in enumerate(file1):
            if i < 2:
                continue

            geostr = re.sub(r"\s+", ",", line[0:60]).split(',')
            ort = re.sub(r"\s+", " ", line[61:102])
            bula = re.sub(r"\s+", " ", line[102:143])

            newstring = ";".join([
                geostr[0],
                geostr[3],
                geostr[4],
                geostr[5],
                ort,
                bula
            ])

            new_file.write(newstring + "\n")

