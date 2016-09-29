//
//  ViewController.swift
//  coreDataWithSwift
//
//  Created by GK-N-WANGLIANG on 16/9/28.
//  Copyright © 2016年 hengg. All rights reserved.
//

import UIKit
import CoreData

class ViewController: UIViewController {

    var items = [NSManagedObject]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let managedContext = appDelegate.managedObjectContext
        
        let fetchRequest = NSFetchRequest<NSFetchRequestResult>(entityName: "Item")
        
        do {
            let results = try managedContext.fetch(fetchRequest)
            items = results as! [NSManagedObject]
            items.removeAll()
            print("There are \(items.count) items ")
            for item in items {
                print("\(item.value(forKey: "name") as! String)`s price is \(item.value(forKey: "price") as! Int)")
            }
        }
        catch let error as NSError {
            print("Could not fetch \(error.userInfo)")
        }
        let entity = NSEntityDescription.entity(forEntityName: "Item", in: managedContext)
        let item = NSManagedObject(entity: entity!, insertInto: managedContext)
        
        var notExist=true
        for item in items {
            let name = item.value(forKey: "name") as! String
            if name=="apple" {
                item.setValue(10, forKey: "price")
                notExist=false
            }
        }
        if notExist {
        item.setValue("apple", forKey: "name")
        item.setValue(10, forKey: "price")
        }
        do {
            try managedContext.save()
            items.append(item)
            // Append ?
        } catch {
            print("error")
        }
        
        print("There are \(items.count) items ")
        for item in items {
            print("\(item.value(forKey: "name") as! String)`s price is \(item.value(forKey: "price") as! Int)")
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

