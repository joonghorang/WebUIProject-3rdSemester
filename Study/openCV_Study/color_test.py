import numpy as np
import cv2
import my_func as mf


img = mf.autoSizing(cv2.imread("3.jpg"))
colorCell = np.zeros((100, 100, 3), np.uint8)

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
height, width, dataNum = hsv.shape

hueArray = [0]*180
for w in range(0, width):
    for h in range(0, height):
        if hsv[h][w][1] < 51 or hsv[h][w][2] < 51 : continue
        hue = hsv[h][w][0]
        hueArray[hue] += 1

hist = mf.drawHistogram(hueArray)
cv2.imshow("hist", hist)

cv2.imshow("name", img)
cv2.waitKey(0)

pickHue = []

##find pick
##ver 1.
##for hue in range(0, len(hueArray)-1):
##    if(hueArray[ hue - 1 ] < hueArray[hue] and hueArray[hue] > hueArray[hue+1]):
##        pickHue.append(hue)
##print pickHue

##ver 2.
##maxHueSize = 0
##maxHue = -1
##for hue in range(len(hueArray)):
##    if maxHueSize < hueArray[hue] :
##        maxHue = hue
##        maxHueSize = hueArray[hue]
##    if hueArray[hue] < 5 and maxHue != -1 and maxHueSize > 5:
##        pickHue.append(maxHue)
##        maxHueSize = 0
##        maxHue = -1

##ver 3.
##minHueSize = min(hueArray)
##maxHueSize = max(hueArray)
##firstHue = hueArray.index(minHueSize)
##for hue in range(len(hueArray)):
##    if hueArray[hue] == maxHueSize:
##        pickHue.append(hue)
##    if hueArray[hue] == minHueSize :
##        firstHue = hue
##        continue    
##    if 

    
for hue in pickHue:
    colorCell[:] = ( hue, 255, 255 )
    print hue
    cv2.imshow("{}".format(hue),cv2.cvtColor(colorCell, cv2.COLOR_HSV2BGR))
    cv2.waitKey(0)
    cv2.destroyWindow("{}".format(hue))

cv2.waitKey(0)
cv2.destroyAllWindows()
