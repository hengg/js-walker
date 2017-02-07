import UIKit
import CoreLocation

class ViewController: UIViewController,CLLocationManagerDelegate {
    
    @IBOutlet var label8: UILabel!
    @IBOutlet var label1: UILabel!
    @IBOutlet var label7: UILabel!
    @IBOutlet var label2: UILabel!
    @IBOutlet var label9: UILabel!
    @IBOutlet var label3: UILabel!
    //    @IBOutlet var label6: UILabel!
    //    @IBOutlet var label5: UILabel!
    //    @IBOutlet var label4: UILabel!
    //    @IBOutlet var label3: UILabel!
    
    let serviceAddress = "http://22.22.22.155:2001/services/InspectionRealHandler.ashx"//"http://10.10.49.45:8081/services/InspectionRealHandler.ashx"/
    let locationManager:CLLocationManager = CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        self.locationManager.pausesLocationUpdatesAutomatically = false
        //设置定位服务管理器代理
        locationManager.delegate = self
        //设置定位进度
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        //更新距离
        locationManager.distanceFilter = 50
        ////发送授权申请
        locationManager.requestAlwaysAuthorization()
        if (CLLocationManager.locationServicesEnabled())
        {
            //允许使用定位服务的话，开启定位服务更新
            locationManager.startUpdatingLocation()
            print("定位开始")
        }
    }
    
    //定位改变执行，可以得到新位置、旧位置
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        //获取最新的坐标
        let currLocation:CLLocation = locations.last!
        label1.text = "经度：\(currLocation.coordinate.longitude)"
        //获取纬度
        label2.text = "纬度：\(currLocation.coordinate.latitude)"
//        //获取海拔
//        label3.text = "海拔：\(currLocation.altitude)"
//        //获取水平精度
//        label4.text = "水平精度：\(currLocation.horizontalAccuracy)"
//        //获取垂直精度
//        label5.text = "垂直精度：\(currLocation.verticalAccuracy)"
//        //获取方向
//        label6.text = "方向：\(currLocation.course)"
        //获取速度
        label7.text = "速度：\(currLocation.speed)"
        //获取时间
        let GPSDate = currLocation.timestamp
        let DeviceDate = Date()
        let outputFormat = DateFormatter()
        //格式化规则
        outputFormat.dateFormat = "yyyy-MM-dd HH:mm:ss"
        //定义时区
        outputFormat.locale = Locale(identifier: "shanghai")
        
        label8.text="GPS日期:\(outputFormat.string(from: GPSDate))"
        label9.text="设备日期:\(outputFormat.string(from: DeviceDate))"
        self.getControlData("\(currLocation.coordinate.longitude)", lat: "\(currLocation.coordinate.latitude)")
        UIDevice.current.isBatteryMonitoringEnabled=true
        label3.text="设备电量:\(UIDevice.current.batteryLevel)"
        UIDevice.current.isBatteryMonitoringEnabled=false
    }
    
    func getJsonFromUrl(_ urlStr:String)->NSDictionary{
        ///发送请求
        let url = URL(string:urlStr.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!)
        ///获取服务器返回数据
        let data = try? Data(contentsOf: url!)
        //判断:数据是否非空?true格式化数据,false结束
        if data == nil {
            return NSDictionary()
        }
        let json : AnyObject! = try? JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.allowFragments) as AnyObject!
        if json == nil {
            return NSDictionary()
        }
        if json.isKind(of: NSDictionary.self){
            return json as! NSDictionary
        }
        return NSDictionary()
    }
    
    
    func getControlData(_ lng:String,lat:String){
        DispatchQueue.global(priority: DispatchQueue.GlobalQueuePriority.default).async(execute: {
            
            let urlStr:String=self.serviceAddress+"?lng=\(lng)&lat=\(lat)"
            print(urlStr)
            let json:NSDictionary = self.getJsonFromUrl(urlStr)
            print(json)
            
            DispatchQueue.main.async(execute: {
                
                
            })
        })
    }
}
