### 调用地理信息
获取设备经纬度,海拔及方向速度等地理信息:
```Swift
import UIKit
import CoreLocation

class ViewController: UIViewController,CLLocationManagerDelegate {
    
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
        print("经度：\(currLocation.coordinate.longitude)")
        //获取纬度
        print("纬度：\(currLocation.coordinate.latitude)")
        //获取海拔
        print("海拔：\(currLocation.altitude)")
        //获取水平精度
        print("水平精度：\(currLocation.horizontalAccuracy)")
        //获取垂直精度
        print("垂直精度：\(currLocation.verticalAccuracy)")
        //获取方向
        print("方向：\(currLocation.course)")
        //获取速度
        print("速度：\(currLocation.speed)")
        //获取时间
        let GPSDate = currLocation.timestamp
        let DeviceDate = Date()
        let outputFormat = DateFormatter()
        //格式化规则
        outputFormat.dateFormat = "yyyy-MM-dd HH:mm:ss"
        //定义时区
        outputFormat.locale = Locale(identifier: "shanghai")
        
        print("GPS日期:\(outputFormat.string(from: GPSDate))")
        print("设备日期:\(outputFormat.string(from: DeviceDate))")
        UIDevice.current.isBatteryMonitoringEnabled=true
        print("设备电量:\(UIDevice.current.batteryLevel)")
        UIDevice.current.isBatteryMonitoringEnabled=false
    }
}
```