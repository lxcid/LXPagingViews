//
//  PeepingPagingView.h
//  Polycliniczz
//
//  Created by Stan Chang Khin Boon on 9/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <UIKit/UIKit.h>

@class PagingView;
@protocol PagingViewDataSource;
@protocol PagingViewDelegate;

@interface PeepingPagingView : UIView

@property (strong, nonatomic) PagingView *pagingView;

- (id)initWithFrame:(CGRect)theFrame insetsOfPageView:(UIEdgeInsets)theEdgeInsets;

- (void)setPagingViewDataSource:(id<PagingViewDataSource>)thePagingViewDataSource delegate:(id<PagingViewDelegate>)thePagingViewDelegate;

@end
