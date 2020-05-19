from flask import Flask, request, jsonify
import json
import pandas as pd
import numpy as np
import gazeanalysis as ga

app = Flask(__name__)

# Load Dataset
def load_dataset(path):
    with open(path) as f:
        output = json.load(f)
        return output

# Respond to Anomoly Graph Requests
@app.route('/submitUserPreferences', methods=['GET','POST'])
def submitUserPreferences():
    # algorithms = str(request.form['algorithms[]'])
    print ("User Preferences Submitted")
    output = {}
    uploadEyeGazeData = request.files.get('uploadEyeGazeData')
    uploadEyeGazeImage = request.files.get('uploadEyeGazeImage')
    uploadEyeGazeData.save("userDataset/" + uploadEyeGazeData.filename)
    uploadEyeGazeImage.save("userImage/" + uploadEyeGazeImage.filename)
    settings = request.form['settings']
    settings = json.loads(settings)
    print ("Chosen Settings", settings)
    dict_1 =[]
    dict_2 = []
    fix_1 =[]
    fix_2 = []
    if "algorithm1" in settings.keys():
        features = settings["algorithm1"]["features"]
        parameters = settings["algorithm1"]["parameters"]
        dict_1 = ga.analysis_1("userDataset/" + uploadEyeGazeData.filename,features["x"],features["y"],features["time"],int(parameters["distance"]),int(parameters["duration"]))
        fix_1 = ga.fixation_plot(dict_1,"algorithm1")
    if "algorithm2" in settings.keys():
        features = settings["algorithm2"]["features"]
        parameters = settings["algorithm2"]["parameters"]
        dict_2 = ga.analysis_1("userDataset/" + uploadEyeGazeData.filename,features["x"],features["y"],features["time"],int(parameters["velocity"]),int(parameters["acceleration"]))
        fix_2 = ga.fixation_plot(dict_2,"algorithm2")
    output["gazeAndDensity"]=dict_1+dict_2
    fix_ = ga.normalize(fix_2+fix_1)
    output["fixationPlot"] = fix_
    response = jsonify(output)
    response.headers['Access-Control-Allow-Origin']='*'
    return response

# Respond to Client fetchData Requests 
@app.route('/fetchInitialData', methods=['POST'])
def fetchInitialData():
    path = "datasets/initialData.json"
    output = load_dataset(path)
    response = jsonify(output)
    response.headers['Access-Control-Allow-Origin']='*'
    return response

if __name__ == '__main__':
    app.run(debug=True)