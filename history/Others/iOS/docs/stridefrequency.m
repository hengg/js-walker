#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController
{
    AVAudioPlayer *player;
    bool flag;
    UIButton *startButton;
    NSTimer *timer;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    flag=TRUE;
    
    [[UIApplication sharedApplication] setIdleTimerDisabled: YES];
    NSString *soundPath=[[NSBundle mainBundle] pathForResource:@"tick" ofType:@"wav"];
    NSURL *soundUrl=[[NSURL alloc] initFileURLWithPath:soundPath];
    player=[[AVAudioPlayer alloc] initWithContentsOfURL:soundUrl error:nil];
    player.delegate=self;
    [player prepareToPlay];
    
    float xw=([UIScreen mainScreen].bounds.size.width-200)/2.0;
    startButton=[[UIButton alloc] initWithFrame:CGRectMake(xw, 200, 200, 80)];
    startButton.backgroundColor=[UIColor colorWithRed:4/255.0 green:159/255.0 blue:241/255.0 alpha:1.0];
    [startButton setTitle:@"开始" forState:UIControlStateNormal];
    startButton.titleLabel.font = [UIFont systemFontOfSize: 28.0];
    [startButton.layer setCornerRadius:5.0];//设置圆角
    [startButton addTarget:self action:@selector(startClick) forControlEvents:UIControlEventTouchUpInside];//指定登录按钮按下响应函数
    [self.view addSubview:startButton];
    
    float xh=[UIScreen mainScreen].bounds.size.height-100;
    UIButton *stopButton=[[UIButton alloc] initWithFrame:CGRectMake(([UIScreen mainScreen].bounds.size.width-58)/2,xh, 58, 58)];
    [stopButton setBackgroundImage:[UIImage imageNamed:@"logo"] forState:UIControlStateNormal];
    [stopButton.layer setCornerRadius:5.0];//设置圆角
    [stopButton addTarget:self action:@selector(stopClick) forControlEvents:UIControlEventTouchUpInside];//指定登录按钮按下响应函数
    [self.view addSubview:stopButton];
}

-(void)handleMaxShowTimer:(NSTimer *)theTimer{
    [player play];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (void)startClick{
    if (flag&&!timer) {
        [startButton setTitle:@"结束" forState:UIControlStateNormal];
        //时间间隔
        NSTimeInterval timeInterval =0.6667 ;
        timer = [NSTimer scheduledTimerWithTimeInterval:timeInterval target:self selector:@selector(handleMaxShowTimer:) userInfo:nil repeats:YES];
        [timer fire];
        flag=FALSE;
    }else if([timer isValid]){
        [startButton setTitle:@"开始" forState:UIControlStateNormal];
        [timer invalidate];
        timer=nil;
        flag=TRUE;
    }
}

- (void)stopClick{
    UIAlertView *alert=[[UIAlertView alloc] initWithTitle:@"步频提醒" message:@"作者：@无逻辑小刺猬 \n特别感谢：@Ashlee @also" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确认", nil];
    [alert show];
}



- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)avplayer successfully:(BOOL)flag{

    [avplayer stop];

}

@end
