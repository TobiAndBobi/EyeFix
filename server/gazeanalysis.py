
from sklearn import preprocessing
# import matplotlib.pyplot as plt
import pandas as pd 
import detector as dp
import numpy as np
from PIL import Image



def analysis_1(img_url,file_name,x_col,y_col,time_col,distance,duration):
    data = pd.read_csv(file_name) 
    data = data.dropna()
    data = data[[x_col,y_col,time_col]].reset_index()
    x = np.array(data[x_col])
    y = np.array(data[y_col])
    time = np.array(data[time_col])
    p,l = dp.fixation_detection(x,y,time,maxdist=distance, mindur=duration)
    im = Image.open(img_url)
    width, height = im.size

    data["label"]=int(1)
    for samples in l:
        data.loc[(data[time_col]>=samples[0]) & (data[time_col]<=samples[1]),"label"] = int(2)
    min_max_scaler = preprocessing.MinMaxScaler()
    x_val = data[[x_col]].values.astype(float)
    # x_scaled = min_max_scaler.fit_transform(x_val)
    x_scaled = np.divide(x_val,width)
    data["Scaled_X"] = pd.DataFrame(x_scaled)
    y_val = data[[y_col]].values.astype(float)
    # y_scaled = min_max_scaler.fit_transform(y_val)
    y_scaled = np.divide(y_val,height)
    data["Scaled_X"] = pd.DataFrame(x_scaled)
    data["Scaled_Y"] = pd.DataFrame(y_scaled)
    data["algorithm"] = "algorithm1"
    data = data.drop([x_col,y_col,"index"],axis=1)
    json_ret = data.to_dict('records')
    return json_ret


def analysis_2(img_url,file_name,x_col,y_col,time_col,velocity,accleration):
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
    im = Image.open(img_url)
    width, height = im.size
    x_val = data1[[x_col]].values.astype(float)
    # x_scaled = min_max_scaler.fit_transform(x_val)
    x_scaled = np.divide(x_val,width)
    data1["Scaled_X"] = pd.DataFrame(x_scaled)
    y_val = data1[[y_col]].values.astype(float)
    y_scaled = np.divide(y_val,height)
    # y_scaled = min_max_scaler.fit_transform(y_val)
    data1["Scaled_X"] = pd.DataFrame(x_scaled)
    data1["Scaled_Y"] = pd.DataFrame(y_scaled)
    data1["algorithm"] = "algorithm2"
    data1.to_dict('records')
    data1 = data1.drop([x_col,y_col,"index"],axis=1)
    json_ret = data1.to_dict('records')
    return json_ret

def fixation_plot(list_of_points,algorithm):
    counter = 0
    x = []
    y = []
    ret= []
    for dict_ in list_of_points:
        if dict_["label"] ==2:
            counter+=1
            x.append(dict_["Scaled_X"])
            y.append(dict_["Scaled_Y"])
        elif dict_["label"] == 1:
            if x != []:
                ret_dict={}
                x_cen = np.sum(x)/len(x)
                y_cen = np.sum(y)/len(y)
                ret_dict["Scaled_X"] = x_cen
                ret_dict["Scaled_Y"] = y_cen
                ret_dict["numberOfPoints"] = len(x)
                ret_dict["algorithm"] = algorithm
                ret.append(ret_dict)
                counter = 0
                x = []
                y = []
    return ret

def normalize(img_url,list_of_points):
    data = pd.DataFrame(list_of_points)
    min_max_scaler = preprocessing.MinMaxScaler()
    x_val = data[["numberOfPoints"]].values.astype(float)
    x_scaled = min_max_scaler.fit_transform(x_val)
    data = data.drop(["numberOfPoints"],axis=1)
    data["numberOfPoints"] = pd.DataFrame(x_scaled)
    return data.to_dict('records')