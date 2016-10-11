#!/usr/bin/python
# -*- coding:utf-8 -*-
# __author__ = 'wangliang'

import os
from biplist import *
from os import listdir
from os.path import isdir

version = "1.2.7"
projectDic = {
    '大唐热网': ['bd', 'http://121.18.227.250:2001'],
    '渠东热网':['hq','http://61.136.109.149:2001'],
    '太原一电':['tyyd','http://59.49.96.156:2001'],
    '太原二电':['tyed','http://218.26.103.2:2001'],
    "乌海热力":['wh','http://1.180.133.102:2001'],
    '乌达热力':['wd','http://1.24.246.178:2001'],
    '富泰热力':['ft','http://111.56.31.170:2001'],
    '测试':['test','http://10.10.49.43']
}

for projectName in projectDic:
    print projectName

    projectForShort = projectDic[projectName][0]
    hostName = projectDic[projectName][1]
    source = '/Users/wangliang/集中供热数据发布平台/icam/userLogo/' + projectForShort + '/'
    iconTarget = '/Users/wangliang/集中供热数据发布平台/icam/icam/Images.xcassets/AppIcon.appiconset/'
    logoTarget = '/Users/wangliang/集中供热数据发布平台/icam/icam/image/'

    if not isdir(source):
        print 'Error: source is not a directory'
        exit()

    iconImageList = listdir(source)
    logoImageList = listdir(source)

    t = 0
    for icon in iconImageList:
        if icon.find('120') == -1 and icon.find('80') == -1 and icon.find('58') == -1:
            del (iconImageList[t])
        t += 1

    a = 0
    for logo in logoImageList:
        if logo.find('logo') == -1:
            del (logoImageList[a])
        a += 1

    for icon in iconImageList:
        srcFilename = source + '/' + icon
        srcFilename = '"' + srcFilename + '"'
        desFilename = iconTarget + '/' + icon
        desFilename = '"' + desFilename + '"'
        copy_command = "cp -R %s %s" % (srcFilename, desFilename)
        print copy_command
        if os.system(copy_command) == 0:
            print 'Successful backup to copy from', srcFilename, 'to', desFilename
        else:
            print 'Fail to copy', srcFilename, 'to', desFilename

    for name in logoImageList:
        srcFilename = source + '/' + name
        srcFilename = '"' + srcFilename + '"'
        desFilename = logoTarget + '/' + name
        desFilename = '"' + desFilename + '"'
        copy_command = "cp -R %s %s" % (srcFilename, desFilename)
        print copy_command
        if os.system(copy_command) == 0:
            print 'Successful backup to copy from', srcFilename, 'to', desFilename
        else:
            print 'Fail to copy', srcFilename, 'to', desFilename

    infoPlistPath = "/Users/wangliang/集中供热数据发布平台/icam/icam/Info.plist"
    try:
        infoPlist = readPlist(infoPlistPath)
    except InvalidPlistException, e:
        print "Not a Plist or Plist Invalid:", e

    # infoPlist['CFBundleName']=projectName;
    infoPlist['CFBundleShortVersionString'] = version
    infoPlist['CFBundleIdentifier'] = 'com.thtf.icam.' + projectForShort

    try:
        writePlist(infoPlist, infoPlistPath)
    except (InvalidPlistException, NotBinaryPlistException), e:
        print "Something bad happened:", e

    try:
        infoPlist = readPlist(infoPlistPath)
        print infoPlist['CFBundleName']
        print infoPlist['CFBundleShortVersionString']
        print infoPlist['CFBundleIdentifier']

    except InvalidPlistException, e:
        print "Not a Plist or Plist Invalid:", e

    projectConfigPlistPath = "/Users/wangliang/集中供热数据发布平台/icam/icam/projectConfig.plist"
    try:
        plist = readPlist(projectConfigPlistPath)
    except InvalidPlistException, e:
        print "Not a Plist or Plist Invalid:", e

    plist['project'] = projectForShort
    plist['host'] = hostName

    try:
        writePlist(plist, projectConfigPlistPath)
    except (InvalidPlistException, NotBinaryPlistException), e:
        print "Something bad happened:", e

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

    appPath = "/Users/wangliang/集中供热数据发布平台/icam/build/Release-iphoneos/icam.app"
    ipaPath = "/Users/wangliang/集中供热数据发布平台/icam/iCAMDH_iOS_" + projectForShort + "_" + version + ".ipa"
    package_command = "xcrun -sdk iphoneos  PackageApplication -v " + appPath + " -o " + ipaPath + ""
    if os.system(package_command) == 0:
        print 'Pack app Successful '
    else:
        print 'Fail to Pack'
