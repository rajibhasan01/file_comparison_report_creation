import cv2;
import sys;
import numpy as np;

name = sys.argv[1];

vidcap = cv2.VideoCapture(name);
success,image = vidcap.read()
count = 0;
colorArray = [];

while success:
  colorMean = np.mean(image[5:30, 5:80])
  colorArray.append(colorMean);
  vidcap.set(cv2.CAP_PROP_POS_MSEC,(count*1000));
  success,image = vidcap.read();
  count += 1;

avrg = int(sum(colorArray) / len(colorArray));
print(avrg);