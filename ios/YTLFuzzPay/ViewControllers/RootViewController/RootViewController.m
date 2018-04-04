//
//  RootViewController.m
//  Facebook
//
//  Created by Ferdly Sethio on 14/11/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RootViewController.h"

@interface RootViewController ()

@property (weak, nonatomic) IBOutlet UIView * splashView;

@end

@implementation RootViewController

- (void)viewDidLoad
{
  [super viewDidLoad];
  
  [UIView animateWithDuration:0.2 delay:1.5 options:UIViewAnimationOptionCurveLinear animations:^(void) {
    self.splashView.alpha = 0;
  } completion:^(BOOL finished) {
    [self.splashView removeFromSuperview];
  }];
}

@end
