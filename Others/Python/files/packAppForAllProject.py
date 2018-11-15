#!/usr/bin/python
# -*- coding:utf-8 -*-
__author__ = 'wangliang'

import os
from biplist import *
from os import listdir
from os.path import isdir

projectDic={'大唐热网':['bd','http://121.18.227.250:2001'],
            '渠东热网':['hq','http://61.136.109.149:2001'],
            '太原热力':['tyyd','http://59.49.96.156:2001'],
            '乌海热力':['wh','http://1.180.133.102:2001'],
            '乌达热力':['wd','http://1.24.246.178:2001'],
            '富泰热力':['ft','http://111.56.31.170:2001'],
            '惠天热电':['sy','http://dd.htrd.cn']}

for projectName in projectDic:
    print projectName

    projectForShort = projectDic[projectName][0]
    hostName = projectDic[projectName][1]
    source = '/Users/wangliang/iOSProject/icam/userLogo/'+projectForShort+'/'
    iconTarget = '/Users/wangliang/iOSProject/icam/icam/Images.xcassets/AppIcon.appiconset/'
    logoTarget = '/Users/wangliang/iOSProject/icam/icam/image/'

    if isdir(source) != True:
        print 'Error: source is not a directory'
        exit()

    iconImageList=listdir(source)
    logoImageList=listdir(source)

    t = 0
    for icon in iconImageList :
        if icon.find('120') == -1 and icon.find('80') == -1 and icon.find('58') == -1 :
            del(iconImageList[t])
        t = t + 1

    a = 0
    for logo in logoImageList :
        if logo.find('logo') == -1 :
            del(logoImageList[a])
        a = a + 1

    for icon in iconImageList :
        srcFilename = source + '/' + icon
        srcFilename = '"' + srcFilename + '"'
        desFilename = iconTarget + '/' + icon
        desFilename = '"' + desFilename + '"'
        copy_command = "cp -R %s %s" % (srcFilename, desFilename)
        print copy_command
        if os.system(copy_command) == 0:
            print 'Successful backup to copy from', srcFilename, 'to' ,desFilename
        else:
            print 'Fail to copy', srcFilename, 'to', desFilename

    for name in logoImageList :
        srcFilename = source + '/' + name
        srcFilename = '"' + srcFilename + '"'
        desFilename = logoTarget + '/' + name
        desFilename = '"' + desFilename + '"'
        copy_command = "cp -R %s %s" % (srcFilename, desFilename)
        print copy_command
        if os.system(copy_command) == 0:
            print 'Successful backup to copy from', srcFilename, 'to' ,desFilename
        else:
            print 'Fail to copy', srcFilename, 'to', desFilename


    infoPlistPath = "/Users/wangliang/iOSProject/icam/icam/Info.plist"
    try:
        infoPlist = readPlist(infoPlistPath);
        oldVersion = infoPlist['CFBundleShortVersionString'];

    except InvalidPlistException, e:
        print "Not a Plist or Plist Invalid:",e

    arr = oldVersion.split('.')
    version = arr[0]+"."+arr[1]+"."+str(int(arr[2])+1)


    plist['CFBundleName']=projectName;
    plist['CFBundleShortVersionString']=version;
    plist['CFBundleIdentifier']='com.thtf.icam'+projectForShort;

    try:
        writePlist(infoPlist,infoPlistPath)
    except (InvalidPlistException,NotBinaryPlistException), e:
        print "Something bad happened:",e

    try:
        infoPlist = readPlist(infoPlistPath);
        print infoPlist['CFBundleName'];
        print infoPlist['CFBundleShortVersionString'];
        print infoPlist['CFBundleIdentifier'];

    except InvalidPlistException, e:
        print "Not a Plist or Plist Invalid:",e

    projectConfigPlistPath = "/Users/wangliang/iOSProject/icam/icam/projectConfig.plist"
    try:
        plist = readPlist(projectConfigPlistPath);
    except InvalidPlistException, e:
        print "Not a Plist or Plist Invalid:",e

    plist['project']=projectForShort;
    plist['host']=hostName;

    try:
        writePlist(plist,projectConfigPlistPath)
    except (InvalidPlistException,NotBinaryPlistException), e:
        print "Something bad happened:",e

    clean_command = "xcodebuild clean"
    if os.system(clean_command) == 0:
         print 'Clean Successful '
    else:
        print 'Fail to clean'


    build_command = "xcodebuild -target icam -configuration Release"
    if os.system(build_command) == 0:
         print 'Build Successful '
    else:
        print 'Fail to build'

    appPath = "/Users/wangliang/iOSProject/icam/build/Release-iphoneos/icam.app"
    ipaPath = "/Users/wangliang/iOSProject/icam/iCAM_iOS_"+projectForShort+version+".ipa"
    package_command = "xcrun -sdk iphoneos  PackageApplication -v "+appPath+" -o "+ipaPath+""
    if os.system(package_command) == 0:
         print 'Pack app Successful '
    else:
        print 'Fail to Pack'
