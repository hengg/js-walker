# Simple Documents Generator
---


一个简单的根据注释生成文档的脚本。
注释格式如下：
```swift
/**
 :funcname: 函数名
 :direction:函数描述
     
 :param: 参数名 :参数描述
*/

func fn(){
  ///获取JSON数据
  let json = getJson();
  //判断:数据是否通过校验?true格式化数据,false结束
  if(!checkData(json)){
    return;
  }
  ///设置数据显示
  dispaly(json);
}
```
生成文档格式如下：
函数: fn
功能: 功能描述
 
参数|说明
----|----
param|参数说明

流程图：
![UML](http://p1.bqimg.com/567571/7176913f26e7ae98.png)
