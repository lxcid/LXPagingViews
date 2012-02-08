//
//  PageView.h
//  LXPagingViewsDemo
//
//  Created by Stan Chang Khin Boon on 9/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ReusableView.h"

@interface PageView : UIView <ReusableView>

@property (strong, nonatomic, readonly) UILabel *textLabel;

@end
