# ლↀѡↀლcoding: utf-8ლↀѡↀლ
__author__ = 'wangliang'


import MySQLdb
import time

class Handle(tornado.web.RequestHandler):
    def POST(self):
        data = ET.fromstring(body)
        ToUserName = data.find('ToUserName').text
        FromUserName = data.find('FromUserName').text
        MsgType = data.find('MsgType').text
        if MsgType == 'text' or MsgType == 'voice':
            try:
                MsgId = data.find("MsgId").text
                if MsgType == 'text':
                    Content = data.find('Content').text # 文本消息内容
                elif MsgType == 'voice':
                    Content = data.find('Recognition').text
                if Content == u'打卡':
                    today = time.strftime('%Y-%m-%d',time.localtime(time.time()))
                    conn=MySQLdb.connect(host='localhost',user='root',passwd='busziki001',db='busziki',port=3306)
                    cur=conn.cursor()
                    cur.execute('select count(*) from test where username=%s ',str(recMsg.FromUserName))
                    temp= cur.fetchone()[0]
                    if temp==
                        Content="这是你第一次打卡,千里之行始于足下,恭喜你!"
                        cur.execute("""insert into test values(%s,%s)""",(recMsg.FromUserName,today))
                        conn.commit()
                    elif temp==21:
                        Content="恭喜你完成了计划!再接再厉!🎉"
                    else:
                        cur.execute('select count(*) from test where date=%s and username=%s',(today,recMsg.FromUserName))
                        todaycount= cur.fetchone()[0]
                        if todaycount==0:
                            cur.execute("""insert into test values(%s,%s)""",(recMsg.FromUserName,today))
                            conn.commit()
                            Content =CC "打卡成功，你已连击%s天，加油噢！"%temp
                        else:
                            Content="你今天已经打过卡了,明日再来吧!"
                        cur.close()
                        conn.close()
                else:
                    reply_content = "这是一条自动回复😳"
                if reply_content:
                    CreateTime = int(time.time())
                    self.write(out)
            except:
                pass
        elif MsgType == 'event':
            try:
                Event = data.find('Event').text
                if Event == 'subscribe':
                    CreateTime = int(time.time())
                    reply_content = "你关注了不撕基,看来你很有品味!"
                    out = self.reply_text(FromUserName, ToUserName, CreateTime, reply_content)
                    self.write(out)
            except:
                pass

def reply_text(self, FromUserName, ToUserName, CreateTime, Content):
    textTpl = """<xml> <ToUserName><![CDATA[%s]]></ToUserName> <FromUserName><![CDATA[%s]]></FromUserName> <CreateTime>%s</CreateTime> <MsgType><![CDATA[%s]]></MsgType> <Content><![CDATA[%s]]></Content></xml>"""
    out = textTpl % (FromUserName, ToUserName, CreateTime, 'text', Content)
    return out



                    #query insert
                    try:

                    except MySQLdb.Error,e:
                        print "Mysql Error %d: %s" % (e.args[0], e.args[1])

                    print content
                    toUser = recMsg.FromUserName
                    fromUser = recMsg.ToUserName
                    replyMsg = reply.TextMsg(toUser, fromUser, content)
                    return replyMsg.send()
                else:
                    return "success"
            else:
                print "暂且不处理"
                return "success"
        except Exception, Argment:
            return Argment






today = time.strftime('%Y-%m-%d',time.localtime(time.time()))
try:
    conn=MySQLdb.connect(host='123.207.158.211',user='root',passwd='busziki001',db='busziki',port=3306)
    cur=conn.cursor()
    temp=cur.execute('select count(*) from test where username=%s ',recMsg.FromUserName)
    if temp==0:
        content="这是你第一次打卡,千里之行始于足下,恭喜你!"
        cur.execute('insert into test values(%s,%s)',[recMsg.FromUserName,today])
    elif temp==21:
        content="恭喜你完成了计划!再接再厉!🎉"
    else:
        todaycount=cur.execute('select  count(*) from test where date=%s ',today)
        if todaycount==0:
            cur.execute('insert into test values(%s,%s)',[recMsg.FromUserName,today])
        else:
            content="你今天已经打过卡了,明日再来吧!"
    cur.close()
    conn.close()
except MySQLdb.Error,e:
    print "Mysql Error %d: %s" % (e.args[0], e.args[1])


作者：sufaith
链接：https://zhuanlan.zhihu.com/p/22494483
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

import os
import tornado.httpserver
import tornado.ioloop
import tornado.web from tornado.options
import define, options from core.url
import urlpatterns

define('port', default=80, help='run on the given port', type=int)

class Application(tornado.web.Application):
    def __init__(self):
        settings = dict( template_path=os.path.join(os.path.dirname(__file__), "core/template"), static_path=os.path.join(os.path.dirname(__file__), "core/static"), debug=True, login_url='/login', cookie_secret='MuG7xxacQdGPR7Svny1OfY6AymHPb0H/t02+I8rIHHE=', )
        super(Application, self).__init__(urlpatterns, **settings)

def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

if __name__ == '__main__':
    main()


    /wx?signature=4a51cc52f7eb5dab5166d938c94c2e7ea0b99f9f
    &timestamp=1479090233
    &nonce=2079414893
    &openid=olO1NwDDTY2h7vfeKLvfEjbY-5mo


    body = self.request.body
    data = ET.fromstring(body)
    ToUserName = data.find('ToUserName').text
    FromUserName = data.find('FromUserName').text

作者：sufaith
链接：https://zhuanlan.zhihu.com/p/22494483
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。