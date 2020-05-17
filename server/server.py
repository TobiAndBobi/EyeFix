from flask import Flask, request, jsonify
import json
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load Dataset
def load_dataset(path):
    with open(path) as f:
        output = json.load(f)
        return output

# Respond to Anomoly Graph Requests
@app.route('/submitUserPreferences', methods=['GET','POST'])
def submitUserPreferences():
    print ("User Preferences Submitted")
    output = {
        "name" : "keshav"
    }
    uploadEyeGazeData = request.files.get('uploadEyeGazeData')
    uploadEyeGazeImage = request.files.get('uploadEyeGazeImage')
    uploadEyeGazeData.save("userDataset/" + uploadEyeGazeData.filename)
    uploadEyeGazeImage.save("userImage/" + uploadEyeGazeImage.filename)
    # place = str(request.form['place'])
    # print (file)
    # print (place)
    # chosenOption = str(request.form['chosenData'])
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