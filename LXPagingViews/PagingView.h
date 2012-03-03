//
//  PagingView.h
//  Polycliniczz
//
//  Created by Stan Chang Khin Boon on 7/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol ReusableView;
@protocol PagingViewDataSource;
@protocol PagingViewDelegate;

@interface PagingView : UIScrollView

@property (nonatomic, readonly, strong) NSMutableDictionary *reusableViews;
@property (nonatomic, weak) id<PagingViewDataSource> dataSource;
@property (nonatomic, assign) BOOL needsReloadData;
@property (nonatomic, assign) NSUInteger selectedPageIndex;

- (UIView<ReusableView> *)dequeueReusableViewWithIdentifier:(NSString *)theIdentifier;

@end

@protocol PagingViewDataSource <NSObject>

- (NSInteger)numberOfItemsInPagingView:(PagingView *)thePagingView;

- (UIView<ReusableView> *)pagingView:(PagingView *)thePagingView reusableViewForPageIndex:(NSUInteger)thePageIndex withFrame:(CGRect)theFrame;

@end

@protocol PagingViewDelegate <UIScrollViewDelegate>

@end