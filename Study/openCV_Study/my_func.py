import numpy as np
import cv2

def autoSizing(img):
    resHeight = 360.0
    height, width, dataNum = img.shape
    ratio = resHeight / height
    smallImg = cv2.resize(img, (0,0), fx = ratio, fy = ratio)
    return smallImg;

def drawHistogram(array):
    length = len(array)
    histoHeight = 500
    histoWidth = 1000
    dataWidth = histoWidth/length
    histo = np.zeros((histoHeight, histoWidth, 3), np.uint8)
    histo[:] = (255, 255, 255)
 
    maxDataHeight = max(array)
    for i in range(length):
        dataHeight = array[i] * histoHeight / maxDataHeight
        cv2.rectangle(
            histo,
            (i*dataWidth, histoHeight - dataHeight),
            ((i+1)*dataWidth - 1, histoHeight),
            (0, 0, 255), 1)

    return histo
    
    


