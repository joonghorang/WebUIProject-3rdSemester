import numpy as np
import cv2

img = cv2.imread('13.jpg')
smallImg = cv2.resize(img, (0,0), fx = 0.7, fy = 0.7)

##Z = smallImg.reshape((-1,3))
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
##res2 = res.reshape((smallImg.shape))
##
##cv2.imshow('image', smallImg)
##cv2.imshow('res', res2)

##hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
##
##lower_blue = np.array([110,50,50])
##upper_blue = np.array([130, 255, 255])
##
##mask = cv2.inRange(hsv, lower_blue, upper_blue)
##
##res = cv2.bitwise_and(img, img, mask = mask)

surf = cv2.SURF(2000)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
kp, des = surf.detectAndCompute(gray, None)
##res = cv2.drawKeypoints(img, kp, None, (255,0,0), 3)
res = cv2.drawKeypoints(img, kp, None, (255, 0, 0), 4)
cv2.imshow('img', cv2.resize(img, (0,0), fx = 0.3, fy = 0.3))
##cv2.imshow('mask', cv2.resize(mask, (0,0), fx = 0.3, fy = 0.3))
cv2.imshow('res', cv2.resize(res, (0,0), fx = 0.3, fy = 0.3))
cv2.waitKey(0)
cv2.destroyAllWindows()
