//
//  PeepingPagingViewController.h
//  LXPagingViewsDemo
//
//  Created by Stan Chang Khin Boon on 9/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PagingView.h"

@class PeepingPagingView;

@interface PeepingPagingViewController : UIViewController<PagingViewDataSource, PagingViewDelegate>

@property (strong, nonatomic) PeepingPagingView *peepingPagingView;

@end
