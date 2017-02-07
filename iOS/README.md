## This is my Swift exercise project

### 读取.plist文件
.plist文件实际上是一个XML文件，示例如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>members</key>
	<array>
		<dict>
			<key>name</key>
			<string>Susan</string>
			<key>age</key>
			<string>22</string>
		</dict>
		<dict>
			<key>name</key>
			<string>Tom</string>
			<key>age</key>
			<string>26</string>
		</dict>
	</array>
</dict>
</plist>
```
使用Swift读取.plist:
```Swift
let propertyList:String = NSBundle.mainBundle().pathForResource("property", ofType:"plist")!
let data:NSMutableDictionary = NSMutableDictionary(contentsOfFile:propertyList)!
let members:NSArray = data.objectForKey("members") as! NSArray
print(members)
```
使用Objective-C读取.plist:
```objectivec
NSString *properties = [[NSBundle mainBundle] pathForResource:@"property" ofType:@"plist"];
    NSMutableDictionary *data = [NSMutableDictionary dictionaryWithContentsOfFile:properties];
    NSArray *members = [data objectForKey:@"members"];
    for (int i=0; i<members.count; i++) {
        NSArray *keys = [members[i] allKeys];
        for(int j=0; j<keys.count; j++){
            NSString *key = keys[j];
            NSString *value=[members[i] objectForKey:keys[j]];
            NSString *string = [NSString stringWithFormat:@"%@,%@", key, value ];
            NSLog(string);
        }
    }
```
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

### 摇一摇获取随机数
```objectivec
#import "ViewController.h"
#import <AVFoundation/AVFoundation.h>

@interface ViewController ()

@end

@implementation ViewController
{
    UITextField *uidTextField;
    AVAudioPlayer *player;
    NSMutableArray *arr;
    NSMutableArray *luckyArr;
    UIButton *button;
    BOOL flag;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    flag=true;
    arr=[[NSMutableArray alloc] init];
    luckyArr=[[NSMutableArray alloc] init];
    
    float x=[[UIScreen mainScreen] bounds].size.width;
    uidTextField=[[UITextField alloc] initWithFrame:CGRectMake((x-200)/2, 100, 200, 40)];
    uidTextField.borderStyle=UITextBorderStyleRoundedRect;
    uidTextField.keyboardType=UIKeyboardTypeNumberPad;
    uidTextField.placeholder=@"输入终止号码";//占位显示
    uidTextField.autocapitalizationType=UITextAutocapitalizationTypeNone;
    [self.view addSubview:uidTextField];
    
    button=[[UIButton alloc] initWithFrame:CGRectMake((x-200)/2, 150, 200, 40)];
    button.backgroundColor=[UIColor colorWithRed:4/255.0 green:159/255.0 blue:241/255.0 alpha:1.0];
    [button setTitle:@"确定" forState:UIControlStateNormal];
    [button.layer setCornerRadius:5.0];//设置圆角
    [button addTarget:self action:@selector(press) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];
    
    UIButton *luckyButton=[[UIButton alloc] initWithFrame:CGRectMake((x-200)/2, [[UIScreen mainScreen] bounds].size.height-60, 200, 40)];
    luckyButton.backgroundColor=[UIColor colorWithRed:4/255.0 green:159/255.0 blue:241/255.0 alpha:1.0];
    [luckyButton setTitle:@"LUCKY DOGS" forState:UIControlStateNormal];
    [luckyButton.layer setCornerRadius:5.0];//设置圆角
    [luckyButton addTarget:self action:@selector(luckyPress) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:luckyButton];
    
    NSString *soundPath=[[NSBundle mainBundle] pathForResource:@"FadeOut" ofType:@"mp3"];
    NSURL *soundUrl=[[NSURL alloc] initFileURLWithPath:soundPath];
    player=[[AVAudioPlayer alloc] initWithContentsOfURL:soundUrl error:nil];
    player.delegate=self;
    [player prepareToPlay];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)press{
    if (flag) {
        
        NSInteger j = [uidTextField.text integerValue];
        if (j<=0) {
            UIAlertView *yaoyiyao = [[UIAlertView alloc]initWithTitle:@"别闹！" message:@"请填入大于零的正整数" delegate:self cancelButtonTitle:@"确定" otherButtonTitles:  nil];
            [yaoyiyao show];
            return;
        }
        for (int i=0; i<j; i++) {
            [arr addObject:[NSNumber numberWithInt:(i+1)]];
        }
        [uidTextField resignFirstResponder];
        [button setTitle:@"重置" forState:UIControlStateNormal];
    }else{
        uidTextField.text=nil;
        arr=[[NSMutableArray alloc] init];
        luckyArr=[[NSMutableArray alloc] init];
        [button setTitle:@"确定" forState:UIControlStateNormal];
    }
    flag=!flag;
}

-(void)luckyPress{
    if (luckyArr.count<=0) {
        UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"💢😡💢" message:@"先抽奖才能中奖！" delegate:self cancelButtonTitle:@"确定" otherButtonTitles:  nil];
        [alert show];
        return;
    }
    NSString * str = [luckyArr componentsJoinedByString:@","];
    UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"中奖名单" message:str delegate:self cancelButtonTitle:@"确定" otherButtonTitles:  nil];
    [alert show];
}

- (BOOL)canBecomeFirstResponder
{
    return YES;// default is NO
}
- (void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
//    [player stop];
}

- (void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
    if (arr.count<=0) {
        UIAlertView *alert ;
        if(!flag){
            alert = [[UIAlertView alloc]initWithTitle:@"_(:з」∠)_" message:@"大家都中奖了！" delegate:self cancelButtonTitle:@"确定" otherButtonTitles:  nil];
        }else{
            alert = [[UIAlertView alloc]initWithTitle:@"_(:з」∠)_" message:@"先输入终止号码再摇！" delegate:self cancelButtonTitle:@"确定" otherButtonTitles:  nil];
        }
        [alert show];
        return;
    }
    [player play];
    int index = arc4random() % arr.count;
    NSString *str=[NSString stringWithFormat:@"本次中奖号码为 %@",arr[index]];
    UIAlertView *yaoyiyao = [[UIAlertView alloc]initWithTitle:@"恭喜！" message:str delegate:self cancelButtonTitle:@"确定" otherButtonTitles:  nil];
    [yaoyiyao show];
    [luckyArr addObject:arr[index]];
    [arr removeObjectAtIndex:index];
}
- (void)motionCancelled:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
    [player stop];
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)avplayer successfully:(BOOL)flag{
    
    [avplayer stop];
    
}
@end
```

### 企业级应用发布所需的.plist文件:
```xml 
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>items</key>
	<array>
		<dict>
			<key>assets</key>
			<array>
				<dict>
					<key>kind</key>
					<string>software-package</string>
					<key>url</key>
					<string>.IPA-FILE-PATH(https)</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>url</key>
					<string>display-image-path</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>full-size-image</string>
					<key>url</key>
					<string>full-size-image-path</string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
				<string>APP-IDENTIFIER</string>
				<key>bundle-version</key>
				<string>1.2.7APP-VERSION</string>
				<key>kind</key>
				<string>software</string>
				<key>title</key>
				<string>APP-NAME</string>
			</dict>
		</dict>
	</array>
</dict>
</plist>
```