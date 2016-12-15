#coding=utf-8
import json
import re
from selenium import webdriver
import time


def getTodayWeatherJson( citycode ):

    #req =urllib2.Request('http://m.weather.com.cn/mweather/'+citycode+'.shtml')
    #req.add_header('User-Agent','Mozilla/5.0 (Android 5.1.1; Mobile; rv:42.0) Gecko/42.0 Firefox/42.0')
    #html = urllib2.urlopen(req).read()
    #data = html.decode('utf-8')

    browser = webdriver.Firefox()
    browser.get("http://m.weather.com.cn/mweather/"+citycode+".shtml")
    time.sleep(5)
    data = browser.page_source
    browser.close()

    # print(data)

    timeStamp = time.time()
    timeArray = time.localtime(timeStamp)
    updateDate = time.strftime("%Y-%m-%d", timeArray)

    pattern = re.compile('<h2>.*<span>(.*?)</span></h2>')
    updateTime = pattern.findall(data)

    pattern = re.compile('<td width="50%" class="wd">(.*?)</td>')
    temperature = pattern.findall(data)

    pattern = re.compile('<td width="30%"><span>(.*?)</span><span>.*</span><span>.*</span></td>')
    weather = pattern.findall(data)

    pattern = re.compile('<td width="30%"><span>.*</span><span>(.*?)</span><span>.*</span></td>')
    windDirection = pattern.findall(data)

    pattern = re.compile('<td width="30%"><span>.*</span><span>.*</span><span>(.*?)</span></td>')
    windPower = pattern.findall(data)

    jsons = []
    i = 0
    for obj in updateTime:
        jsons.append({ "updateTime": updateDate+" "+updateTime[0][0:5],"temperature": temperature[0],"weather": weather[0],
                       "windDirection": windDirection[0],"windPower": windPower[0]})
        i=i+1
    data = json.dumps(jsons, ensure_ascii=False)
    return data

# json = getTodayWeatherJson('101080301')
# print(json)
print time.time()