# ლↀѡↀლcoding: utf-8ლↀѡↀლ
__author__ = 'wangliang'

import re
import json
from os import listdir
from os.path import isfile

list=listdir("/Users/wangliang/Documents/666")
# print list
nicknamearr=[]
addsarr=[]
for file in list:
    if isfile("/Users/wangliang/Documents/666/"+file):
        if file == '.DS_Store':
            continue
        uipath = unicode("/Users/wangliang/Documents/666/"+file , "utf8")
        file_object = open(uipath)
        try:
            for data in file_object:
                pattern = re.compile('list : .*?\.msg_item,')
                restr = pattern.findall(data)
                if len(restr)>0:
                    head='[\'list : ({\"msg_item\":'
                    end='}).msg_item,'
                    res=restr[0]
                    resarr = res.split('\"id\"')

                    for ress in resarr:
                        if '\"content\"' in ress:
                            pattern = re.compile('\"content\":\"(.*?)\"')
                            content = pattern.findall(ress)
                            pattern1 = re.compile('\"nick_name\":\"(.*?)\"')
                            resss=pattern1.findall(ress)
                            nickname=resss[0]
                            s = content[0]
                            if ('省' in s)|('市' in s):
                                addsarr.append(s)
                                nicknamearr.append(nickname)

                        # else:
                        #     pattern = re.compile('\"nick_name\":\"(.*?)\"')
                        #     resss=pattern.findall(ress)
                        #     if len(resss)>0:
                        #         nickname=resss[0].decode('utf-8')
                        #         # print nickname
                        #         nicknamearr.append(nickname)
        finally:
            file_object.close()

print len(nicknamearr)
# s = set(nicknamearr)
# c = [i for i in s]




for add in addsarr:
    print add

# import webbrowser
# import selenium

# for i in range(1,365,1):
#     url="https://mp.weixin.qq.com/cgi-bin/message?t=message/list&action=&keyword=&frommsgid=404216319&offset=%d&count=50&day=7&filterivrmsg=&token=1405181661&lang=zh_CN" % (i*50)
#     webbrowser.open(url, new=2, autoraise=True)

# from selenium import webdriver
# from selenium.common.exceptions import NoSuchElementException
# from selenium.webdriver.common.keys import Keys
# import time
#
# browser = webdriver.Firefox() # Get local session of firefox
# browser.get("https://mp.weixin.qq.com/cgi-bin/message?t=message/list&action=&keyword=&frommsgid=404216319&offset=50&count=50&day=7&filterivrmsg=&token=1405181661&lang=zh_CN") # Load page
# assert "Yahoo!" in browser.title
# elem = browser.find_element_by_name("p") # Find the query box
# elem.send_keys("seleniumhq" + Keys.RETURN)
# time.sleep(0.2) # Let the page load, will be added to the API
# try:
#     browser.find_element_by_xpath("//a[contains(@href,'http://seleniumhq.org')]")
# except NoSuchElementException:
#     assert 0, "can't find seleniumhq"
# browser.close()