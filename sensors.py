#!/usr/bin/env python3

import Adafruit_DHT
import time
import os
from datetime import datetime

def setFilePath():
    global d, fullFilePath
    d = datetime.now()
    initYear = "%04d" % (d.year)
    initMonth = "%02d" % (d.month)
    initDay = "%02d" % (d.day)
    fullFilePath = f"{os.path.dirname(os.path.realpath(__file__))}/log/{initYear}{initMonth}{initDay}.log"

setFilePath()

DHT_SENSOR = Adafruit_DHT.DHT22

# Change this to the GPIO pin used (not the pin number)
DHT_PIN = 14

while True:
    humidity, temp = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    # Check for new day, update `fullFilePath` if true:
    if datetime.now().day != d.day:
        setFilePath()
    
    with open(fullFilePath,mode='a') as f:
        if humidity is not None and temp is not None:
            tmp = datetime.now()
            initHour = "%02d" % (tmp.hour)
            initMins = "%02d" % (tmp.minute)
            initSecs = "%02d" % (tmp.second)
            f.write(f"[{initHour}:{initMins}:{initSecs}] *** Temp={(temp * 9/5) + 32:.1f} Humidity={humidity:.1f}\n")

    time.sleep(5)