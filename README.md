# DHT22 Log Script

This simple python3 script logs temperature and humidity data from a DHT22 module connected to a Raspberry Pi to it's `./log` directory using Adafruit's (now depredated) [DHT Library](https://github.com/adafruit/Adafruit_Python_DHT).

## Usage

This script is meant to be used in a cron job. To modify crontab, open a terminal and run `crontab -e`, and append the appropriate command. Below is an example to log every minute indefinitely:

```bash
* * * * * python3 sensors/sensors.py
```

**Important** - Before defining any cron jobs make sure to update `script.py` and confirm that the `DHT_PIN` variable is set to the correct GPIO number on your Raspberry Pi (not the pin number itself). For example, I use GPIO #14 but on the Raspberry Pi it's pin #7.