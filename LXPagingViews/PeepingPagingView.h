//
//  PeepingPagingView.h
//  Polycliniczz
//
//  Created by Stan Chang Khin Boon on 9/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PagingView.h"

@interface PeepingPagingView : UIView

@property (assign, nonatomic) UIEdgeInsets edgeInsets;
@property (strong, nonatomic) PagingView *pagingView;
@property (nonatomic, assign) NSUInteger selectedPageIndex;
@property (nonatomic, assign) BOOL ignoreInputsForSelection;

- (id)initWithFrame:(CGRect)theFrame insetsOfPageView:(UIEdgeInsets)theEdgeInsets;

- (void)setPagingViewDataSource:(id<PagingViewDataSource>)thePagingViewDataSource delegate:(id<PagingViewDelegate>)thePagingViewDelegate;

- (void)setPagingViewNeedsReloadData;

@end
