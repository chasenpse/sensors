#!/usr/bin/env python3

import Adafruit_DHT
import os
from datetime import datetime
from configparser import ConfigParser
import requests

config = ConfigParser()
config.read(f"{os.path.dirname(os.path.realpath(__file__))}/config.ini")

d = datetime.now()
initYear = "%04d" % (d.year)
initMonth = "%02d" % (d.month)
initDay = "%02d" % (d.day)
initHour = "%02d" % (d.hour)
initMins = "%02d" % (d.minute)
fullFilePath = f"{os.path.dirname(os.path.realpath(__file__))}/data/{initYear}-{initMonth}-{initDay}.csv"

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = int(config.get('general','DHT_PIN'))
UNITS = config.get('general','UNITS').upper()
IFTTT_SERVICE = config.get('ifttt','ENABLED').upper()
IFTTT_KEY = config.get('ifttt','KEY')
TEMP_EVENT = config.get('ifttt','TEMP_EVENT')
HUMIDITY_EVENT = config.get('ifttt','HUMIDITY_EVENT')
WARNING_TEMP = float(config.get('ifttt','WARNING_TEMP'))
WARNING_HUMIDITY = float(config.get('ifttt','WARNING_HUMIDITY'))

humidity, temp = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

def sendTempAlert():
    requests.post(f'https://maker.ifttt.com/trigger/{TEMP_EVENT}/with/key/{IFTTT_KEY}', json={"value1": f'{temp:.1f}', "value2": f'{UNITS}', "value3": f'[{initHour}:{initMins}]'})

def sendHumidityAlert():
    requests.post(f'https://maker.ifttt.com/trigger/{HUMIDITY_EVENT}/with/key/{IFTTT_KEY}', json={"value1": f'{humidity:.1f}', "value2": f'{UNITS}', "value3": f'[{initHour}:{initMins}]'})

if UNITS == 'F':
    temp = (temp * 9/5) + 32

if os.path.isfile(fullFilePath):
    with open(fullFilePath,mode='a') as f:
        if humidity is not None and temp is not None:
            f.write(f"{initHour}:{initMins}:00,{temp:.1f},{humidity:.1f}\n")
            if (IFTTT_SERVICE == '1' or IFTTT_SERVICE == 'TRUE') and temp >= WARNING_TEMP:
                sendTempAlert()
            if (IFTTT_SERVICE == '1' or IFTTT_SERVICE == 'TRUE') and humidity >= WARNING_HUMIDITY:
                sendHumidityAlert()
else:
    with open(fullFilePath,mode='a') as f:
        if humidity is not None and temp is not None:
            f.write("time,temperature,humidity\n")
            f.write(f"{initHour}:{initMins}:00,{temp:.1f},{humidity:.1f}\n")
            if (IFTTT_SERVICE == '1' or IFTTT_SERVICE == 'TRUE') and temp >= WARNING_TEMP:
                sendTempAlert()
            if (IFTTT_SERVICE == '1' or IFTTT_SERVICE == 'TRUE') and humidity >= WARNING_HUMIDITY:
                sendHumidityAlert()