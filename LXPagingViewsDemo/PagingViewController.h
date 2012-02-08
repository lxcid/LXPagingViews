//
//  PagingViewController.h
//  Polycliniczz
//
//  Created by Stan Chang Khin Boon on 8/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PagingView.h"

@class PagingView;

@interface PagingViewController : UIViewController<PagingViewDataSource, PagingViewDelegate>

@property (strong, nonatomic) PagingView *pagingView;

@end
