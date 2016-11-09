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

    var session: AVCaptureSession?;
    var layer: AVCaptureVideoPreviewLayer?;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.session = AVCaptureSession();

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
            
            self.layer = AVCaptureVideoPreviewLayer(session:self.session!);
            self.layer!.frame = self.view.frame;
            self.view.layer.addSublayer(self.layer!);
            
            self.session?.startRunning();
        }  
        catch let error as NSError  
        {  
            print(error);  
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
//                self.session!.stopRunning();
//                self.layer!.removeFromSuperlayer();
                
                let alertController = UIAlertController(title: "提示", message: "是否在Safari中打开链接:\(stringValue! as String)", preferredStyle: .alert)
                let cancelAction = UIAlertAction(title: "取消", style: .cancel) { (action) in
//                    self.session!.startRunning()
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

