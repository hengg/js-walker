# coding=utf-8
__author__ = 'wangliang'

import flask
import cookielib
import urllib2
import json
import re
import time

app = flask.Flask(__name__)


@app.route('/15days/<code>')
def fifteenDays(code):
    json = get15DaysWeatherJson(code)
    return json


def get15DaysWeatherJson(citycode):
    req = urllib2.Request('http://m.weather.com.cn/mweather15d/' + citycode + '.shtml')
    req.add_header('User-Agent', 'Mozilla/5.0 (Android 5.1.1; Mobile; rv:42.0) Gecko/42.0 Firefox/42.0')
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

    pattern = re.compile(
            '<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/n.*.png">.*</span>\n<span>\n(.*?)</span>')
    nwinds = pattern.findall(data)

    pattern = re.compile(
            '<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/d.*.png">.*</span>\n<span>\n(.*?)</span>')
    dwinds = pattern.findall(data)

    if len(dwinds) < 15:
        pattern = re.compile(
                '<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/d.*.png">.*</span>\n<span>(.*?)</span>')
        dwinds = pattern.findall(data)
        dwinds.insert(-14, "- -")
        dayTemperatures.insert(-14, "-")
        dayWeathers.insert(-14, "-")

    jsons = []
    i = 0
    for obj in dates:
        nightWindPower = nwinds[i].split(' ')[1]
        nightWindDirection = nwinds[i].split(' ')[0]
        dayWindPower = dwinds[i].split(' ')[1]
        dayWindDirection = dwinds[i].split(' ')[0]
        jsons.append({"date": obj, "nightTemperature": nightTemperatures[i], "dayTemperature": dayTemperatures[i],
                      "nightWeather": nigjtWeathers[i], "dayWeather": dayWeathers[i],
                      "nightWindPower": nightWindPower, "nightWindDirection": nightWindDirection,
                      "dayWindPower": dayWindPower, "dayWindDirection": dayWindDirection})
        i = i + 1
    data = json.dumps(jsons, ensure_ascii=False)
    return data


@app.route('/today/<code>')
def today(code):
    timestr = time.time().__str__()
    json = getTodayWeatherJson(code, timestr)
    return json


def getTodayWeatherJson(citycode, timestr):
    # cj=cookielib.CookieJar()
    # opener=urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
    # urllib2.install_opener(opener)
    #
    # opener.open('http://m.weather.com.cn/mweather/'+citycode+'.shtml')

    req = urllib2.Request('http://d1.weather.com.cn/sk_2d/' + citycode + '.html?_=' + timestr)
    req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 5.1; rv:11.0) Gecko/20100101 Firefox/11.0')
    req.add_header('Referer', 'http://m.weather.com.cn/mweather/' + citycode + '.shtml')
    req.add_header('Host', 'd1.weather.com.cn')
    reqs = urllib2.urlopen(req).read()

    data = reqs.split('=')[1]

    pattern = re.compile('.*"time":"(.*?)",.*')
    time = pattern.findall(data)

    pattern = re.compile('.*"temp":"(.*?)",.*')
    temp = pattern.findall(data)

    pattern = re.compile('.*"weather":"(.*?)",.*')
    weather = pattern.findall(data)

    pattern = re.compile('.*"WD":"(.*?)",.*')
    wd = pattern.findall(data)

    pattern = re.compile('.*"WS":"(.*?)",.*')
    ws = pattern.findall(data)

    jsons = []
    jsons.append({"updateTime": time[0], "temperature": temp[0], "weather": weather[0],
                  "windDirection": wd[0], "windPower": ws[0]})

    jsons = json.dumps(jsons, ensure_ascii=False)
    return jsons


# if __name__ == '__main__':
#     app.run(debug=True)

print (getTodayWeatherJson('101080301', time.time().__str__()))
