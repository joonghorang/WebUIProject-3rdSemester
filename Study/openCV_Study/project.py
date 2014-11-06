import numpy as np
import cv2
import my_func as mf

THRESHOLD_SATURATION_RATE = 0.2
THRESHOLD_BRIGHTNESS_RATE = 0.2



oriImg = cv2.imread('3.jpg')
oriImg = mf.autoSizing(oriImg)

hsvImg = cv2.cvtColor(oriImg, cv2.COLOR_BGR2HSV)
height, width, dataNum = hsvImg.shape

#init hueArray
hueArray = []
for hue in range(0, 180):
    hueArray.append({"hue" : hue, "size" : 0})

#draw hue histogram 
for h in range(0, height):
    for w in range(0, width):
        if hsvImg[h][w][1] < 256 * THRESHOLD_SATURATION_RATE or \
        hsvImg[h][w][2] < 256 * THRESHOLD_BRIGHTNESS_RATE: continue

        hue = hsvImg[h][w][0]
        hueArray[hue]["size"] += 1

hist = mf.drawHistogram(hueArray)
cv2.imshow("hist", hist)


cv2.imshow('img', oriImg)
cv2.waitKey(0)
cv2.destroyAllWindows()


### Tutorial kmean
##oriImg = cv2.imread('13.jpg')
##oriImg = mf.autoSizing(oriImg)
##Z = oriImg.reshape((-1,3))
##
### convert to np.float32
##Z = np.float32(Z)
##
### define criteria, number of clusters(K) and apply kmeans()
##criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
##K = 4
##ret,label,center=cv2.kmeans(Z,K,criteria,10,cv2.KMEANS_RANDOM_CENTERS)
##
### Now convert back into uint8, and make original image
##center = np.uint8(center)
##res = center[label.flatten()]
##res2 = res.reshape((oriImg.shape))
##
##cv2.imshow('image', oriImg)
##cv2.imshow('res', res2)
##cv2.waitKey(0)
##cv2.destroyAllWindows()

###Tutorial mask
##oriImg = cv2.imread('13.jpg')
##oriImg = mf.autoSizing(oriImg)
##hsv = cv2.cvtColor(oriImg, 2)
##
##lower_blue = np.array([110,50,50])
##upper_blue = np.array([130, 255, 255])
##
##mask = cv2.inRange(hsv, lower_blue, upper_blue)
##
##res = cv2.bitwise_and(oriImg, oriImg, mask = mask)
##
##cv2.imshow('image', oriImg)
##cv2.imshow('res', res)
##cv2.waitKey(0)
##cv2.destroyAllWindows()

###Tutorial Feature detect
##surf = cv2.SURF(2000)
##gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
##kp, des = surf.detectAndCompute(gray, None)
####res = cv2.drawKeypoints(img, kp, None, (255,0,0), 3)
##res = cv2.drawKeypoints(img, kp, None, (255, 0, 0), 4)
##
##cv2.imshow('img', cv2.resize(img, (0,0), fx = 0.3, fy = 0.3))
####cv2.imshow('mask', cv2.resize(mask, (0,0), fx = 0.3, fy = 0.3))
##cv2.imshow('res', cv2.resize(res, (0,0), fx = 0.3, fy = 0.3))

##cv2.waitKey(0)
##cv2.destroyAllWindows()
