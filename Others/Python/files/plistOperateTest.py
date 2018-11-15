#!/usr/bin/python
# -*- coding:UTF-8 -*-
__author__ = 'wangliang'

from biplist import *
# from  datetime import datetime
# plist={'aKey':'aValue',
#        '0':1.322,
#        'now':datetime.now(),
#        'list':[1,2,3],
#        'tuple':('a','b','c'),
#        'dict':{'list':1234,'aKey':11111}
# }
# try:
#     writePlist(plist,"demo.plist")
# except (InvalidPlistException,NotBinaryPlistException), e:
#     print "Something bad happened:",e
# else:
#     pass
# finally:
#     pass

try:
    plist = readPlist("Info.plist");
    oldVersion = plist['CFBundleShortVersionString'];

except InvalidPlistException, e:
    print "Not a Plist or Plist Invalid:",e

arr = oldVersion.split('.')
version = arr[0]+"."+arr[1]+"."+str(int(arr[2])+1)


plist['CFBundleName']='乌海热力';
plist['CFBundleShortVersionString']=version;
plist['CFBundleIdentifier']='com.thtf.icam.wh';

try:
    writePlist(plist,"Info.plist")
except (InvalidPlistException,NotBinaryPlistException), e:
    print "Something bad happened:",e

try:
    plist = readPlist("Info.plist");
    print plist['CFBundleName'];
    print plist['CFBundleShortVersionString'];
    print plist['CFBundleIdentifier'];

except InvalidPlistException, e:
    print "Not a Plist or Plist Invalid:",e
