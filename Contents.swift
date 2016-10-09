//: Playground - noun: a place where people can play

import UIKit

func httpSend(url:String,body:Any?,completionHandler: @escaping(Data?, URLResponse?, Error?) -> Void){
    //请求URL
    let url:URL! = URL(string: url)
    var request:URLRequest = URLRequest(url: url)
    if body != nil{
        //设置为POST请求
        request.httpMethod = "POST"
        var bodyData:Data!
        //UTF8转码，防止汉字符号引起的非法网址
        //设置请求体
        switch body {
        case is String:
            bodyData = (body as! String).data(using: String.Encoding.utf8)
        case is Data:
            bodyData = (body as! Data)
        default:
            print("Unkown body type.")
        }
        request.httpBody = bodyData
    }else{
        request.httpMethod = "GET"
    }
    //默认session配置
    let config = URLSessionConfiguration.default
    let session = URLSession(configuration: config)
    //发起请求
    let dataTask = session.dataTask(with: request, completionHandler: completionHandler)
    //请求开始
    dataTask.resume()
}

DispatchQueue.global().async {
    let url = "http://icam.thtf.com.cn/Service.svc/CheckUpdate/AppName=ICAM_IOS_1_3_0"
    httpSend(url: url, body: nil, completionHandler: { (data, response, error) in
        let json = try?JSONSerialization.jsonObject(with: data!, options: .allowFragments)
        
        DispatchQueue.main.async {
            //在主线程中执行
            print(json)
        }
    })
}