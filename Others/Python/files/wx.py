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
                    conn=MySQLdb.connect(host='host',user='uid',passwd='pwd',db='db',port=3306)
                    cur=conn.cursor()
                    cur.execute('select count(*) from test where username=%s ',str(recMsg.FromUserName))
                    temp= cur.fetchone()[0]
                    if temp==0:
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
                            Content = "打卡成功，你已连击%s天，加油噢！"%temp
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
