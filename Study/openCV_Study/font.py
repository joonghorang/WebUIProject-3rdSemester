# -*-encoding:utf-8-*-
import cv2
import PIL
import numpy as np
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

fontSize = 20
margin = 5
imgSize = fontSize + margin * 2
cellSize = 30


def getShape((xsize, ysize), v):
    smallImg = np.zeros((xsize,ysize,3), np.uint8)
    smallImg[:] = (0, 0, v)
    return smallImg

##    xLineLength = xsize * (256 - v) / 256
##    yLineLength = ysize * (256 - v) / 256
##    cv2.line(smallImg,(xsize/2, (ysize - yLineLength)/2),\
##             (xsize/2, (ysize + yLineLength)/2 ),(0,0,255),1)
##    cv2.line(smallImg,((xsize - xLineLength)/2,ysize/2),\
##             ((xsize + xLineLength)/2 ,ysize/2),(0,0,255),1)
##    return smallImg
    
    
font = ImageFont.truetype(u"윤고딕150_1.ttf", fontSize)

img=Image.new("RGBA", (imgSize,imgSize),(255,255,255))
draw = ImageDraw.Draw(img)
draw.text((margin+2, margin),u"가",(0,0,0),font=font)
draw = ImageDraw.Draw(img)

cvimg = cv2.cvtColor(np.array(img), cv2.COLOR_RGBA2BGR)
cvimg = cv2.resize(cvimg, (0,0), fx = 10, fy = 10)
hsv = cv2.cvtColor(cvimg, cv2.COLOR_BGR2HSV)
newImg = Image.new("RGBA", (imgSize*10 ,imgSize*10), (255, 255, 255))
newImg = cv2.cvtColor(np.array(newImg), cv2.COLOR_RGBA2BGR)
newImg = cv2.cvtColor(newImg, cv2.COLOR_BGR2HSV)

for x in range(0, imgSize*10, cellSize):
    for y in range(0, imgSize*10, cellSize):
        smallImg = hsv[x:x+cellSize, y:y+cellSize]
        pixVAvg = 0
        for sx in range(cellSize):
            for sy in range(cellSize):
                pixVAvg += smallImg[sx, sy][2]
        pixVAvg /= cellSize**2
        
        newImg[x:x+cellSize, y:y+cellSize] \
                             = getShape((cellSize, cellSize), pixVAvg)

cv2.imshow("cell", cv2.cvtColor(newImg, cv2.COLOR_HSV2BGR))
cv2.imshow("test", cvimg)
cv2.waitKey(0)
cv2.destroyAllWindows()
