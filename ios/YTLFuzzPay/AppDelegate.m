/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import "RootViewController.h"

#ifdef TESTUI
BOOL testUI = true;
#else
BOOL testUI = false;
#endif

#ifdef DEBUG
BOOL debug = true;
#else
BOOL debug = false;
#endif

#ifdef STAGING
BOOL staging = true;
#else
BOOL staging = false;
#endif

#ifdef PROD
BOOL prod = true;
#else
BOOL prod = false;
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"YTLFuzzPay"
                                               initialProperties:@{@"debug": @(debug),
                                                                   @"staging": @(staging),
                                                                   @"prod": @(prod),
                                                                   @"testUI": @(testUI)}
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[RootViewController alloc] init];
  rootView.frame = rootViewController.view.bounds;
  rootView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  [rootViewController.view insertSubview:rootView atIndex:0];
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  NSLog (@"Font families: %@", [UIFont familyNames]);
  return YES;
}

@end
