//
//  PagingView.h
//  Polycliniczz
//
//  Created by Stan Chang Khin Boon on 7/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol ReusableView;
@class PagingView;

@protocol PagingViewDataSource <NSObject>

- (NSInteger)numberOfItemsInPagingView:(PagingView *)thePagingView;

- (UIView<ReusableView> *)pagingView:(PagingView *)thePagingView reusableViewForPageIndex:(NSUInteger)thePageIndex withFrame:(CGRect)theFrame;

@end

@protocol PagingViewDelegate <UIScrollViewDelegate>

@optional
/**
 * Returns the selected page index the paging view should display.
 */
- (NSUInteger)pagingViewSelectedPageIndex:(PagingView *)thePagingView;

@end

@interface PagingView : UIScrollView

@property (nonatomic, readonly, strong) NSMutableDictionary *reusableViews;
@property (nonatomic, assign) id<PagingViewDataSource> dataSource;
@property (nonatomic, assign) id<PagingViewDelegate> delegate;
@property (nonatomic, assign) BOOL needsReloadData;
@property (nonatomic, assign) NSUInteger selectedPageIndex;
@property (nonatomic, readonly, assign) UIView<ReusableView> *selectedPage;
@property (nonatomic, assign, getter = isIgnoreInputsForSelection) BOOL ignoreInputsForSelection;
@property (nonatomic, assign, getter = isReusableViewsEnabled) BOOL reusableViewsEnabled;

- (UIView<ReusableView> *)dequeueReusableViewWithIdentifier:(NSString *)theIdentifier;

- (void)setSelectedPageIndex:(NSUInteger)theSelectedPageIndex animated:(BOOL)theAnimated;

- (NSUInteger)indexOfVisiblePage:(UIView<ReusableView> *)thePage;
- (UIView<ReusableView> *)visiblePageAtIndex:(NSUInteger)theInteger;

- (void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)theToInterfaceOrientation duration:(NSTimeInterval)theDuration;
- (void)willAnimateRotationToInterfaceOrientation:(UIInterfaceOrientation)theInterfaceOrientation duration:(NSTimeInterval)theDuration;

@end