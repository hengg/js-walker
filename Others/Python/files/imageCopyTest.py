#!/usr/bin/python
# -*- coding:utf-8 -*-
__author__ = 'wangliang'

import os
from os import listdir
from os.path import isdir
#source = ['/home/swaroop/byte', '/home/swaroop/bin']
source = '/Users/wangliang/PycharmProjects/tools/source/'
target_dir = '/Users/wangliang/PycharmProjects/tools/target/'

if isdir(source) != True:
    print 'Error: source is not a directory'
    exit()
k=0
filelist = listdir(source)
print(filelist)
t = 0
for name in filelist :
    if name.find('jpg') == -1 and name.find('png') == -1 :
        del(filelist[t])
    t = t + 1
print(filelist)
#exit()
for name in filelist :
    srcFilename = source + '/' + name
    srcFilename = '"' + srcFilename + '"'
    desFilename = target_dir + '/' + name
    desFilename = '"' + desFilename + '"'
    #print
    copy_command = "cp -R %s %s" % (srcFilename, desFilename)
    print copy_command
    if os.system(copy_command) == 0:
        k = k + 1
        print 'Successful backup to copy from', srcFilename, 'to' ,desFilename
    else:
        print 'Fail to copy', srcFilename, 'to', desFilename
print 'total copy', k, 'files'
os.system("ls")