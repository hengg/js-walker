//
//  ViewController.swift
//  readPlist
//
//  Created by GK-N-WANGLIANG on 16/9/27.
//  Copyright © 2016年 hengg. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let propertyList:String = NSBundle.mainBundle().pathForResource("property", ofType:"plist")!
        let data:NSMutableDictionary = NSMutableDictionary(contentsOfFile:propertyList)!
        let members:NSArray = data.objectForKey("members") as! NSArray
        print(members)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

