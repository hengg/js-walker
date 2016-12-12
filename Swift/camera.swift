import UIKit
import AVFoundation
import Photos
import CoreData

class ViewController: UIViewController,UIImagePickerControllerDelegate,UINavigationControllerDelegate {
    
    @IBOutlet var imageView: UIImageView!
    var url:URL!
    var fileData:Data!
    //存放照片资源的标志符
    var localId:String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.modalPresentationStyle=UIModalPresentationStyle.currentContext;
        
        
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func openCamera(_ sender: AnyObject) {
        let hasCamera = UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.camera)
        //        Alamofire.request(.GET, "https://httpbin.org/get", parameters: ["foo": "bar"])
        //            .responseJSON { response in
        //                print(response.request)  // original URL request
        //                print(response.response) // URL response
        //                print(response.data)     // server data
        //                print(response.result)   // result of response serialization
        //
        //                if let JSON = response.result.value {
        //                    print("JSON: \(JSON)")
        //                }
        //        }
        if(hasCamera)
        {
            let picker = UIImagePickerController()
            picker.sourceType = UIImagePickerControllerSourceType.camera
            picker.mediaTypes = UIImagePickerController.availableMediaTypes(for: UIImagePickerControllerSourceType.camera)!
            picker.delegate = self
            self.present(picker, animated: true, completion: nil)
            
        }
        else
        {
            let alert=UIAlertView(title: "提示", message: "找不到摄像头", delegate: nil, cancelButtonTitle: "好")
            alert.show()
        }
    }
    
    @IBAction func openAlbum(_ sender: AnyObject) {
        let picker = UIImagePickerController()
        picker.sourceType = UIImagePickerControllerSourceType.photoLibrary
        picker.mediaTypes = UIImagePickerController.availableMediaTypes(for: UIImagePickerControllerSourceType.photoLibrary)!
        picker.delegate = self
        self.present(picker, animated: true, completion: nil)
        
    }
    @IBAction func upload(_ sender: AnyObject) {
        //        let fileData = UIImageJPEGRepresentation(imageView.image!, 1.0)
        //        Alamofire.upload(.POST, "http", file: url)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        let mediaType = info[UIImagePickerControllerMediaType] as! String
        
        if (mediaType=="public.image"){
            let image = info[UIImagePickerControllerOriginalImage] as! UIImage
            if picker.sourceType==UIImagePickerControllerSourceType.camera {
                PHPhotoLibrary.shared().performChanges({
                    let result = PHAssetChangeRequest.creationRequestForAsset(from: image)
                    let assetPlaceholder = result.placeholderForCreatedAsset
                    //保存标志符
                    self.localId = assetPlaceholder?.localIdentifier
                    }, completionHandler: { (isSuccess: Bool, error: NSError?) in
                        if isSuccess {
                            print("保存成功!")
                            //通过标志符获取对应的资源
                            let assetResult = PHAsset.fetchAssets(
                                withLocalIdentifiers: [self.localId], options: nil)
                            let asset = assetResult[0]
                            let options = PHContentEditingInputRequestOptions()
                            options.canHandleAdjustmentData = {(adjustmeta: PHAdjustmentData)
                                -> Bool in
                                return true
                            }
                            //获取保存的图片路径
                            asset.requestContentEditingInput(with: options,
                                completionHandler: {(contentEditingInput: PHContentEditingInput?,
                                    info: [AnyHashable: Any]) -> Void in
                                    self.url = contentEditingInput!.fullSizeImageURL!
                            })
                        } else{
                            print("保存失败：", error!.localizedDescription)
                        }
                })

            }
            else{
                print( info)
            }
            
            if let pickedImage = info[UIImagePickerControllerOriginalImage] as? UIImage {
                imageView.contentMode = .scaleAspectFit
                imageView.image = pickedImage
            }
        }else if (mediaType=="public.movie"){
            //获取视频文件路径
            let filePath = info[UIImagePickerControllerMediaURL] as! URL
            url=info[UIImagePickerControllerMediaURL] as! URL
            
            //生成视频截图
            let avAsset = AVAsset(url: filePath)
            let generator = AVAssetImageGenerator(asset: avAsset)
            generator.appliesPreferredTrackTransform = true
            let time = CMTimeMakeWithSeconds(0.0,600)
            var actualTime:CMTime = CMTimeMake(0,0)
            let imageRef:CGImage = try! generator.copyCGImage(at: time, actualTime: &actualTime)
            let frameImg = UIImage(cgImage: imageRef)
            //显示截图
            imageView.image = frameImg
        }
        dismiss(animated: true, completion: nil)
    }
    
    func saveImage() {
        let image = self.imageView.image!
        PHPhotoLibrary.shared().performChanges({
            PHAssetChangeRequest.creationRequestForAsset(from: image)
            }, completionHandler: { (isSuccess: Bool, error: NSError?) in
                if isSuccess {
                    print("保存成功!")
                } else{
                    print("保存失败：", error!.localizedDescription)
                }
        })
    }
}

