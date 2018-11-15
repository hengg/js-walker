#!/usr/local/bin/python2.7
#coding=utf-8
#__author__ = 'wangliang'

from flask import Flask
import re
import urllib2
import json
import time
import cookielib
import traceback
import os
import socket


from flask import Flask
app = Flask(__name__)

timertmp = time

#设置连接超时时间
socket.setdefaulttimeout(5)


#重写重新定向类（禁止重定向）
class RedirectHandler(urllib2.HTTPRedirectHandler):
    def http_error_301(self, req, fp, code, msg, headers):
        print("301")
        pass
    def http_error_302(self, req, fp, code, msg, headers):
        print("302")
        pass

cj=cookielib.CookieJar()
debug_handler = urllib2.HTTPHandler(debuglevel=1)
#禁止自动重定向    
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj),RedirectHandler,debug_handler)
urllib2.install_opener(opener)

@app.route('/15days/<code>')
def fifteenDays(code):
    cityCode = code
    json = get15DaysWeatherJson(cityCode)
#    print(json)
    return json

@app.route('/today/<code>')
def today(code):
    timestr=time.time().__str__()
    json = getTodayWeatherJson(code,timestr)
    return json

def getTodayWeatherJson( citycode ,timestr):

    try:
       
        #a = 1/0  #异常测试
        
        #cj=cookielib.CookieJar()
        #opener=urllib2.build_opener(urllib2.HTTPCookieProcessor(cj),RedirectHandler)
        #urllib2.install_opener(opener)

        #opener.open('http://m.weather.com.cn/mweather/'+citycode+'.shtml')

        req=urllib2.Request('http://d1.weather.com.cn/sk_2d/'+citycode+'.html?_='+timestr)
        req.add_header('User-Agent','Mozilla/5.0 (Android 5.1.1; Mobile; rv:42.0) Gecko/42.0 Firefox/42.0')
        req.add_header('Referer','http://m.weather.com.cn/mweather/'+citycode+'.shtml')
        req.add_header('Host','d1.weather.com.cn')
        #reqs = urllib2.urlopen(req,timeout=5).read()
        request = urllib2.urlopen(req)
        reqs = request.read()
        request.close()

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
        jsons.append({ "updateTime": time[0],"temperature": temp[0],"weather": weather[0],
                       "windDirection": wd[0],"windPower": ws[0]})

        jsons = json.dumps(jsons, ensure_ascii=False)
        return jsons
    except urllib2.URLError as e:
        print("1-------------urlError:"+e.message)
    except socket.timeout as e:
        print("1------------socket timeout:"+e.message)    
    except:
        if not os.path.exists("c:\\weatherserverlog"):
            os.makedirs(r"c:\\weatherserverlog")        
        f=open("c:\\weatherserverlog\\WeatherLog.txt",'a')
        f.writelines(timertmp.strftime('%Y-%m-%d %X',timertmp.localtime())+"-----------")
        traceback.print_exc(file=f)
        f.flush()
        f.close()

#@app.route('/today/<code>')
#def today(code):
#    cityCode=code
#    json=getTodayWeatherJson(code)
#    print  json
#    return  json

#def getTodayWeatherJson( citycode ):
#
#    req =urllib2.Request('http://m.weather.com.cn/mweather/'+citycode+'.shtml')
#    req.add_header('User-Agent','Mozilla/5.0 (Android 5.1.1; Mobile; rv:42.0) Gecko/42.0 Firefox/42.0')
#    html = urllib2.urlopen(req).read()
#    data = html.decode('utf-8')
#
#    pattern = re.compile('<input type="hidden" id="mobile_internal_update_time" value=(.*?)/>')
#    updateTime = pattern.findall(data)
#
#    pattern = re.compile('<td width="50%" class="wd">(.*?)</td>')
#    temperature = pattern.findall(data)
#
#    pattern = re.compile('<td width="30%"><span>(.*?)</span><span>.*</span><span>.*</span></td>')
#    weather = pattern.findall(data)
#
#    pattern = re.compile('<td width="30%"><span>.*</span><span>(.*?)</span><span>.*</span></td>')
#    windDirection = pattern.findall(data)
#
#    pattern = re.compile('<td width="30%"><span>.*</span><span>.*</span><span>(.*?)</span></td>')
#    windPower = pattern.findall(data)
#
#    print updateTime
#
#    jsons = []
#    i = 0
#    for obj in updateTime:
#        jsons.append({ "updateTime": updateTime[0][1:17],"temperature": temperature[0],"weather": weather[0],
#                      "windDirection": windDirection[0],"windPower": windPower[0]})
#        i=i+1
#    data = json.dumps(jsons, ensure_ascii=False)
#    return data

def get15DaysWeatherJson( citycode ):

    try:
        req =urllib2.Request('http://m.weather.com.cn/mweather15d/'+citycode+'.shtml')
        req.add_header('User-Agent','Mozilla/5.0 (Android 5.1.1; Mobile; rv:42.0) Gecko/42.0 Firefox/42.0')
        #html = urllib2.urlopen(req,timeout=5).read()
        request = urllib2.urlopen(req)
        html = request.read()
        request.close()        
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
        if len(dwinds)==0:
            dwinds = re.findall('<span><img src="http://i.tq121.com.cn/i/wap/wx_w/80bai/d.*.png">.*</span>\n<span>(.*?)</span>', data)        

        jsons = []
        i = 0
        n=0
        for obj in dates:
            if len(dayTemperatures)<len(dates) and 0==i:
                dayTemperature=" "
                dayWeather = " "
                dayWindPower = " "
                dayWindDirection = " "                                 
            else:
                dayTemperature=dayTemperatures[n]
                dayWeather = dayWeathers[n]
                dayWindPower = dwinds[n].split(' ')[1]
                dayWindDirection = dwinds[n].split(' ')[0]
                n=n+1
        
            nightWindPower = nwinds[i].split(' ')[1]
            nightWindDirection = nwinds[i].split(' ')[0]            
            jsons.append({ "date": obj,"nightTemperature": nightTemperatures[i],"dayTemperature": dayTemperature,
                           "nightWeather": nigjtWeathers[i],"dayWeather":dayWeather,
                           "nightWindPower": nightWindPower,"nightWindDirection": nightWindDirection,
                           "dayWindPower": dayWindPower,"dayWindDirection": dayWindDirection})
            i=i+1
        data = json.dumps(jsons, ensure_ascii=False)
        return data
    except urllib2.URLError as e:
        print("2-------------urlError:"+e.message)
    except socket.timeout as e:
        print("2------------socket timeout:"+e.message)
    except:
        if not os.path.exists("c:\\weatherserverlog"):
            os.makedirs(r"c:\\weatherserverlog")        
        f=open("c:\\weatherserverlog\\WeatherLog.txt",'a')
        f.writelines(timertmp.strftime('%Y-%m-%d %X',timertmp.localtime())+"-----------")
        traceback.print_exc(file=f)
        f.flush()
        f.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=2001,debug=False)
   
    # with open('weather.json', 'w') as f:
    #     data = json.dumps(jsons, ensure_ascii=False)
    #     f.write(data)
    #     f.close()
# print (getTodaysWeatherJson('101080301'))
