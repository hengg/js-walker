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