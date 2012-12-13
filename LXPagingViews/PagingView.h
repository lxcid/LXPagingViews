//  PagingView.h
//
// Copyright (c) 2012 Stan Chang Khin Boon (http://lxcid.com/)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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