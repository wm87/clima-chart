import re
import csv
import os
import fnmatch

def find_files(directory, pattern):
    for root, dirs, files in os.walk(directory):
        for basename in files:
            if fnmatch.fnmatch(basename, pattern):
                filename = os.path.join(root, basename)
                yield filename

input_dir = "/data/measurements/"

output_dir = "/web/site/js/"
output_file = os.path.join(output_dir, "array4DataNames.js")

# Datei für Dateinamen-Liste öffnen
with open(output_file, "w") as array4DataNames:
    array4DataNames.write("var array4DataNames = [")

    # Alle CSV-Dateien finden
    for filename in find_files(input_dir, "*.csv"):
        print("Verarbeite:", filename)

        # CSV lesen
        with open(filename, 'r') as file1:
            reader = csv.reader(file1, delimiter=';')
            new_rows_list = []
            for row in reader:
                station = re.sub(r"[\n\t\s]*", "", row[0])
                dateMeasure = re.sub(r"[\n\t\s]*", "", row[1])
                temperature = re.sub(r"[\n\t\s]*", "", row[5])
                rainfall = re.sub(r"[\n\t\s]*", "", row[14])

                if temperature == "-999":
                    temperature = "k.A."
                if rainfall == "-999":
                    rainfall = "k.A."

                new_row = [station, dateMeasure[0:4], temperature, rainfall]
                new_rows_list.append(new_row)

        # CSV überschreiben
        with open(filename, 'w', newline='') as file2:
            writer = csv.writer(file2, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            writer.writerows(new_rows_list)

        # Namen für Array schreiben
        short_name = re.sub(r"\s+", " ", os.path.basename(filename))
        array4DataNames.write(f'"{short_name}",')

    # Letztes Komma entfernen
    array4DataNames.seek(array4DataNames.tell() - 1)
    array4DataNames.write("];")
