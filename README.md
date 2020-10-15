# DHT22 Log Script

This is a simple script that writes temperature and humidity information to `./log` from the DHT22 module, using Adafruit's (now depredated) [DHT Library](https://github.com/adafruit/Adafruit_Python_DHT).

**Important** - Before running the script for the first time, edit `script.py` and make sure `DHT_PIN` is set to the correct GPIO number (not the pin number itself). For example, we use GPIO 14 but on the rPi it is pin #7.
