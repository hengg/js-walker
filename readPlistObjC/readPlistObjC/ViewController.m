//
//  ViewController.m
//  readPlistObjC
//
//  Created by GK-N-WANGLIANG on 16/9/27.
//  Copyright © 2016年 hengg. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
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
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
