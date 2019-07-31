//
//  ViewController.swift
//  qrscanner
//
//  Created by WANGLIANG on 2016/11/9.
//  Copyright © 2016年 WANGLIANG. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController,AVCaptureMetadataOutputObjectsDelegate {

    var session: AVCaptureSession?
    var layer: AVCaptureVideoPreviewLayer?
    let scanLine = UIImageView()
    
    let screenWidth = UIScreen.main.bounds.size.width
    let screenHeight = UIScreen.main.bounds.size.height
    var subViewHeight = CGFloat()
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        self.session = AVCaptureSession();
        subViewHeight = (screenHeight-screenWidth)/2
        
        let device = AVCaptureDevice.defaultDevice(withMediaType: AVMediaTypeVideo);
        do
        {
            let input = try AVCaptureDeviceInput(device: device);
            
            if (self.session?.canAddInput(input))!
            {
                self.session?.addInput(input);
            }
            
            let output = AVCaptureMetadataOutput();
            output.setMetadataObjectsDelegate(self, queue: DispatchQueue.main);
            
            if (self.session?.canAddOutput(output))!
            {
                self.session?.addOutput(output)
                output.metadataObjectTypes = [AVMetadataObjectTypeQRCode];
            }
            
            self.layer = AVCaptureVideoPreviewLayer(session: self.session)
            self.layer!.frame = self.view.frame;
            self.view.layer.addSublayer(self.layer!);
            
            self.session?.startRunning();
        }  
        catch let error as NSError  
        {  
            print(error);  
        }
        
        let blur = UIBlurEffect(style: UIBlurEffectStyle.light)
        let topEffectView = UIVisualEffectView(effect: blur)
        topEffectView.frame = CGRect(x: 0, y: 0, width: screenWidth, height: subViewHeight)
        self.view.addSubview(topEffectView)
        let bottomEffectView = UIVisualEffectView(effect: blur)
        bottomEffectView.frame = CGRect(x: 0, y:screenWidth+subViewHeight, width: screenWidth, height: subViewHeight)
        self.view.addSubview(bottomEffectView)

        var timer = Timer()
        //设置扫描线
        scanLine.frame = CGRect(x: 0, y: 0, width: screenWidth, height: 5)
        scanLine.image = UIImage(named: "ScanLine")
        //添加扫描线图层
        self.view.addSubview(scanLine)
        timer = Timer.scheduledTimer(timeInterval: 2, target: self, selector: #selector(moveScannerLayer(_:)), userInfo: nil, repeats: true)
    }

    func moveScannerLayer(_ timer : Timer) {
        scanLine.frame = CGRect(x: 0, y: subViewHeight, width: screenWidth, height: 12);
        UIView.animate(withDuration: 2) {
            self.scanLine.frame = CGRect(x: self.scanLine.frame.origin.x, y: self.scanLine.frame.origin.y + self.screenWidth - 10, width: self.scanLine.frame.size.width, height: self.scanLine.frame.size.height)
        }
    }
    
    func captureOutput(_ captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [Any]!, from connection: AVCaptureConnection!) {
     
        let stringValue:String?;
        
        if (metadataObjects.count > 0)
        {
            let metadataObject = metadataObjects[0] as! AVMetadataMachineReadableCodeObject;

            stringValue = metadataObject.stringValue;
            if (nil != stringValue)
            {
                
                let alertController = UIAlertController(title: "提示", message: "是否在Safari中打开链接:\(stringValue! as String)", preferredStyle: .alert)
                let cancelAction = UIAlertAction(title: "取消", style: .cancel) { (action) in

                }
                alertController.addAction(cancelAction)
                let OKAction = UIAlertAction(title: "打开", style: .default) { (action) in
                    let url = URL(string: stringValue!)
                    UIApplication.shared.openURL(url!)
                }
                alertController.addAction(OKAction)
                self.present(alertController, animated: true) {
                    // ...
                }
            }
        }  
    }

}
