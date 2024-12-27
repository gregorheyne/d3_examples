import json
import sys
import os
from pathlib import Path
sys.path.append('./')

dir_data = Path(os.getcwd()).parent / 'data'

# Read the JSON file
with open(dir_data / 'miserables.json', 'r') as file:
    data = json.load(file)

# Process nodes: Add "label" attribute
for node in data.get("nodes", []):
    node["label"] = (node["id"] + '\n') * 3

# Write the updated JSON to a new file
with open(dir_data / 'miserables_v2.json', 'w') as file:
    json.dump(data, file, indent=4)
