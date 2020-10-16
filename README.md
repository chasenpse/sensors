# DHT22 Log/IFTTT Notification Script

This simple python3 script logs temperature and humidity data from a DHT22 module connected to a Raspberry Pi. Logs are saved as CSV files within the `./log` directory. This script can also optionally use IFTTT to send notifications for high temperature readings.

## Dependencies

This script requires the [Adafruit_DHT](https://github.com/adafruit/Adafruit_Python_DHT) library. Please note this library has been **deprecated**, so use with caution. To install simply open a terminal and run:

```bash
sudo pip3 install Adafruit_DHT
```

## Setup

Before running the script a `config.ini` file must first be created. To use the provided example open a terminal, navigate to the repo, and run the following command:

```bash
cp config-sample.ini config.ini
```

Once created open your config with your preferred text editor of choice and confirm that `DHT_PIN` is set to the correct GPIO number on your Raspberry Pi (not the pin number itself). For example I use GPIO #14, but on the Raspberry Pi it's pin #7.

Once the script is properly configured it's ready to use in a cron job. To modify cron jobs open a terminal and run `crontab -e`, and append the appropriate command. Below is an example to log every minute indefinitely:

```bash
* * * * * python3 sensors/sensors.py
```

## IFTTT

To enable IFTTT webhook notifications, open your config and under the [ifttt] section set `ENABLED` to `1` or `TRUE`, provide your `KEY` and `EVENT` name, and set `WARNING_TEMP` to the desired value.