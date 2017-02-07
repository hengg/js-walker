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