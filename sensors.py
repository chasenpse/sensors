#!/usr/bin/env python3

import Adafruit_DHT
import time
import os
from datetime import datetime

d = datetime.now()
initYear = "%04d" % (d.year)
initMonth = "%02d" % (d.month)
initDay = "%02d" % (d.day)
initHour = "%02d" % (d.hour)
initMins = "%02d" % (d.minute)
initSecs = "%02d" % (d.second)
fullFilePath = f"{os.path.dirname(os.path.realpath(__file__))}/log/{initYear}{initMonth}{initDay}.log"

DHT_SENSOR = Adafruit_DHT.DHT22

# Change this to the GPIO pin used (not the pin number)
DHT_PIN = 14

humidity, temp = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

with open(fullFilePath,mode='a') as f:
    if humidity is not None and temp is not None:
        f.write(f"[{initHour}:{initMins}:{initSecs}] *** Temp={(temp * 9/5) + 32:.1f} Humidity={humidity:.1f}\n")
