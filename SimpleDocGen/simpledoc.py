# -*- coding:utf-8 -*-
import os
import os.path


def getSummarize(): #获取文件功能概述
    flag = False
    summarize="**功能概述**:"
    filename="## ```文件:"
    for i in range(0, len(all_the_text)):#逐行读取文件
        line = all_the_text[i]
        if line.__contains__(".swift"): #行以.swift结束则开始解析文件声明
            filename=filename+line[3:len(line)].strip("\n")+"```\n"
            flag=True
            continue
        if line.__contains__("icam"):   #行包含icam(本项目名)则解析文件声明结束
            flag=False
            break
        if flag:
            summarize=summarize+line[3:len(line)]
        i=i+1
    #文件声明写入文本文件
    summarize= "".join(summarize.split())
    summarize="\n"+filename+""+summarize+"\n"
    writeDoc(summarize)
    return

#追加写入文本文件
def writeDoc(content):
    filename= 'doc.txt'
    fileobj = file(filename,'a')
    fileobj.write(content)
    fileobj.close()


def getVariables(): #获取关键变量
    paramTable = "变量|说明\n-----|-----\n"
    flag = True
    for i in range(0, len(all_the_text)):
        line = all_the_text[i]
        if flag:
            if line.__contains__(" var "):  #获取变量
                nPos=0
                if ":" in line:
                    nPos = line.index(":")
                else:
                    nPos=line.index("=")
                paramTable=paramTable+line[line.index(" var ")+4:nPos]+"|"
                if "//" in line:
                    paramTable=paramTable+line[line.index("//")+2:len(line)]
            if line.__contains__(" let "):  #获取常量
                nPos=0
                if ":" in line:
                    nPos = line.index(":")
                else:
                    nPos=line.index("=")
                paramTable=paramTable+line[line.index(" let ")+4:nPos]+"|"
                if "//" in line:
                    paramTable=paramTable+line[line.index("//")+2:len(line)]
        if line.__contains__("func"):   #检测到函数开始则结束解析
            flag=False
    if len(paramTable)>30:
        writeDoc(paramTable)
    return


def getFunc():
    annotationFlag=False
    funcFlag=False
    braceCount=0
    paramTable = "参数|说明\n-----|-----\n"
    ops=[]
    opsAndConds=[]
    for i in range(0, len(all_the_text)):
        line = all_the_text[i]
        if line.__contains__("/**"):
            annotationFlag=True
            continue
        if line.__contains__("*/"):
            annotationFlag=False
        if annotationFlag:
            if line.__contains__(":funcname:"):
                writeDoc("\n### ```函数:"+line[line.index(":funcname:")+10:len(line)].strip('\n') +"```\n")
            if line.__contains__(":direction:"):
                writeDoc("功能:"+line[line.index(":direction:")+11:len(line)])
            if line.__contains__(":returns:"):
                writeDoc("返回值:"+line[line.index(":returns:")+9:len(line)])
            if line.__contains__(":param:"):
                paramStr = line[line.index(":param:")+7:len(line)]
                params=paramStr.split(",")
                for param in params:
                    temp = param.split(":")
                    param=temp[0]+"|"+temp[1]
                    paramTable=paramTable+param+"\n"
        if len(paramTable)>30:
            writeDoc(paramTable)
            paramTable = "参数|说明\n-----|-----\n"
        if line.__contains__("func") and line.__contains__("{") :
            funcFlag=True
        if line.__contains__("convenience") and line.__contains__("{") :
            funcFlag=True
        if funcFlag:
            if line.__contains__("{"):
                braceCount=braceCount+1
            if line.__contains__("}"):
                braceCount=braceCount-1
            if line.__contains__("///"):
                ops.append("=>operation: "+line[line.index("///")+3:len(line)])
            if line.__contains__("//判断:"):
                ops.append("cond=>condition: "+line[line.index("//判断:")+9:len(line)])
            if braceCount==0:
                funcFlag=False
                for i in range(0,len(ops)):
                    if ops[i].__contains__("cond") and ops[i].__contains__("?"):
                        opsAndConds.append(ops[i][0:ops[i].index("?")]+"\n")
                        conds=ops[i][ops[i].index("?")+1:len(ops[i])].split(",")
                        if conds[0].__contains__("结束")==False:
                            opsAndConds.append("=>operation:  "+conds[0][conds[0].index("true")+4:len(conds[0])])
                        if conds[1].__contains__("结束")==False:
                            opsAndConds.append("=>operation:  "+conds[1][conds[1].index("false")+5:len(conds[1])])
                    else:
                        opsAndConds.append(ops[i])

                flows="```flow\nst=>start: 开始\ne=>end: 结束\n"
                for i in range(0,len(opsAndConds)):
                    if opsAndConds[i].__contains__("cond"):
                        flows=flows+opsAndConds[i]
                    else:
                        flows=flows+"op"+i.__str__()+opsAndConds[i]+"\n"

                flows=flows+"\n"+"st->"
                for i in range(0,len(opsAndConds)):
                    if opsAndConds[i].__contains__("cond"):
                        flows=flows+"cond\ncond(yes)->op"+(i+1).__str__()+"\ncond(no)->e\n"
                    else:
                        flows=flows+"op"+i.__str__()+"->"
                if len(flows)>46:
                    writeDoc(flows+"e\n```\n")
                ops=[]
                opsAndConds=[]
    return


rootdir = "/Users/wangliang/iOSProject/icam/icam/"
# rootdir = "/Users/wangliang/iOSProject/icam/icam/image/WEATHER/NIGHT"
for parent,dirnames,filenames in os.walk(rootdir):
    for filename in filenames:
        if filename.__contains__("Thtf") and filename.endswith("swift"):
            print "--开始处理文件:" + filename
            file_object = open(os.path.join(parent,filename))
            all_the_text = file_object.readlines()
            file_object.close()
            print "----开始处理声明..."
            getSummarize()
            print "----处理声明结束."
            print "----开始处理变量..."
            getVariables()
            print "----处理变量结束."
            print "----开始处理函数..."
            getFunc()
            print "----处理函数结束."
print "--处理文件结束:" + filename
