
from sklearn import preprocessing
import matplotlib.pyplot as plt
import pandas as pd 
import detector as dp
import numpy as np



def analysis_1(file_name,x_col,y_col,time_col,distance,duration):
    data = pd.read_csv(file_name) 
    data = data.dropna()
    data = data[[x_col,y_col,time_col]].reset_index()
    x = np.array(data[x_col])
    y = np.array(data[y_col])
    time = np.array(data[time_col])
    p,l = dp.fixation_detection(x,y,time,maxdist=distance, mindur=duration)

    data["label"]=int(1)
    for samples in l:
        data.loc[(data[time_col]>=samples[0]) & (data[time_col]<=samples[1]),"label"] = int(2)
    min_max_scaler = preprocessing.MinMaxScaler()
    x_val = data[[x_col]].values.astype(float)
    x_scaled = min_max_scaler.fit_transform(x_val)
    data["Scaled_X"] = pd.DataFrame(x_scaled)
    y_val = data[[y_col]].values.astype(float)
    y_scaled = min_max_scaler.fit_transform(y_val)
    data["Scaled_X"] = pd.DataFrame(x_scaled)
    data["Scaled_Y"] = min_max_scaler.fit_transform(y_scaled)
    data["algorithm"] = "algorithm1"
    data = data.drop([x_col,y_col,"index"],axis=1)
    json_ret = data.to_dict('records')
    return json_ret


def analysis_2(file_name,x_col,y_col,time_col,velocity,accleration):
    data1 =  pd.read_csv(file_name) 
    data1 = data1[[x_col,y_col,time_col]].dropna()
    x1 = np.array(data1[x_col])
    y1 = np.array(data1[y_col])
    time1 = np.array(data1[time_col])
    p1,l1 = dp.saccade_detection(x1,y1,time1,maxvel=velocity, maxacc=accleration)
    data1["label"]=int(1)
    for samples in l1:
        data1.loc[(data1[time_col]>=samples[0]) & (data1[time_col]<=samples[1]),"label"] = int(2)
    min_max_scaler = preprocessing.MinMaxScaler()
    x_val = data1[[x_col]].values.astype(float)
    x_scaled = min_max_scaler.fit_transform(x_val)
    data1["Scaled_X"] = pd.DataFrame(x_scaled)
    y_val = data1[[y_col]].values.astype(float)
    y_scaled = min_max_scaler.fit_transform(y_val)
    data1["Scaled_X"] = pd.DataFrame(x_scaled)
    data1["Scaled_Y"] = min_max_scaler.fit_transform(y_scaled)
    data1["algorithm"] = "algorithm2"
    data1.to_dict('records')
    data1 = data1.drop([x_col,y_col,"index"],axis=1)
    json_ret = data1.to_dict('records')
    return json_ret


