#!/usr/local/bin/python2.7
#coding=gbk
import cookielib
import httplib

import requests
__author__ = 'wangliang'

from flask import Flask
import re
import urllib2
import json

from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    json = get15DaysWeatherJson('101010100')
    print(json)
    return json

def get15DaysWeatherJson( citycode ):

    req =urllib2.Request('http://m.weather.com.cn/mweather15d/'+citycode+'.shtml')
    req.add_header('User-Agent','Mozilla/5.0 (Android 5.1.1; Mobile; rv:42.0) Gecko/42.0 Firefox/42.0')
    html = urllib2.urlopen(req).read()
    data = html.decode('utf-8')

    pattern = re.compile('<span class="temperature .*2 ng-binding">(.*?)</span>')
    nightTemperatures = pattern.findall(data)

    pattern = re.compile('<span class="temperature .*1 ng-binding">(.*?)/</span>')
    dayTemperatures = pattern.findall(data)

    pattern = re.compile('<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/d.*.png">(.*?)</span>')
    dayWeathers = pattern.findall(data)

    pattern = re.compile('<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/n.*.png">(.*?)</span>')
    nigjtWeathers = pattern.findall(data)

    pattern = re.compile('<span class="date">(.*?)</span>')
    dates = pattern.findall(data)

    pattern = re.compile('<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/n.*.png">.*</span>\n<span>\n(.*?)</span>')
    nwinds = pattern.findall(data)

    pattern = re.compile('<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/d.*.png">.*</span>\n<span>\n(.*?)</span>')
    dwinds = pattern.findall(data)

    if len(dwinds)<15:
        pattern = re.compile('<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/d.*.png">.*</span>\n<span>(.*?)</span>')
        dwinds = pattern.findall(data)
        dwinds.insert(-14,"- -")
        dayTemperatures.insert(-14,"-")
        dayWeathers.insert(-14,"-")

    jsons = []
    i = 0
    for obj in dates:
        nightWindPower = nwinds[i].split(' ')[1]
        nightWindDirection = nwinds[i].split(' ')[0]
        dayWindPower = dwinds[i].split(' ')[1]
        dayWindDirection = dwinds[i].split(' ')[0]
        jsons.append({ "date": obj,"nightTemperature": nightTemperatures[i],"dayTemperature": dayTemperatures[i],
                       "nightWeather": nigjtWeathers[i],"dayWeather": dayWeathers[i],
                       "nightWindPower": nightWindPower,"nightWindDirection": nightWindDirection,
                       "dayWindPower": dayWindPower,"dayWindDirection": dayWindDirection})
        i=i+1
    data = json.dumps(jsons, ensure_ascii=False)
    return data

# if __name__ == '__main__':
#     app.run(debug=True)
    # with open('weather.json', 'w') as f:
    #     data = json.dumps(jsons, ensure_ascii=False)
    #     f.write(data)
    #     f.close()
# print (get15DaysWeatherJson('101080301'))


