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
    node["label"] = node["id"]
    node["tooltip"] = (node["id"] + '\n') * 3

# Write the updated JSON to a new file
with open(dir_data / 'miserables_v2.json', 'w') as file:
    json.dump(data, file, indent=4)


# add groups into the data as well for vs_3
nodegroups = [
    [0, 'Group Blue', "#1f77b4",'circle'],
    [1, 'Group Orange', "#ff7f0e",'circle'],
    [2, 'Group Green', "#2ca02c",'circle'],
    [3, 'Group Red', "#d62728",'circle'],
    [4, 'Group Purple', "#9467bd",'circle'],
    [5, 'Group Brown', "#8c564b",'rectangle'],
    [6, 'Group Pink', "#e377c2",'rectangle'],
    [7, 'Group Gray', "#7f7f7f",'rectangle'],
    [8, 'Group Yellow-Green', "#bcbd22",'rectangle'],
    [9, 'Group Cyan', "#17becf",'rectangle'],
    [10, 'Group Light Blue', "#aec7e8", 'rectangle']
]
data['nodegroups'] = []
for nodegroup in nodegroups:
    data['nodegroups'].append({
        'id': nodegroup[0],
        'name': nodegroup[1],
        'color': nodegroup[2],
        'shape': nodegroup[3],
    })
# Write the updated JSON to a new file
with open(dir_data / 'miserables_v3.json', 'w') as file:
    json.dump(data, file, indent=4, )