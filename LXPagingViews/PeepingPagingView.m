//  PeepingPagingView.m
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

#import "PeepingPagingView.h"
#import "PagingView.h"

@implementation PeepingPagingView

@synthesize edgeInsets = _edgeInsets;
@synthesize pagingView = _pagingView;

- (void)setFrame:(CGRect)theFrame {
    [super setFrame:theFrame];
    self.pagingView.frame = UIEdgeInsetsInsetRect(self.bounds, self.edgeInsets);
}

- (NSUInteger)selectedPageIndex {
    return self.pagingView.selectedPageIndex;
}

- (void)setSelectedPageIndex:(NSUInteger)theSelectedPageIndex {
    self.pagingView.selectedPageIndex = theSelectedPageIndex;
}

- (BOOL)ignoreInputsForSelection {
    return self.pagingView.ignoreInputsForSelection;
}

- (void)setIgnoreInputsForSelection:(BOOL)theIgnoreInputsForSelection {
    self.pagingView.ignoreInputsForSelection = theIgnoreInputsForSelection;
}

- (id)initWithFrame:(CGRect)theFrame insetsOfPageView:(UIEdgeInsets)theEdgeInsets {
    self = [super initWithFrame:theFrame];
    if (self) {
        self.edgeInsets = theEdgeInsets;
        self.pagingView = [[PagingView alloc] initWithFrame:UIEdgeInsetsInsetRect(self.bounds, self.edgeInsets)];
        self.pagingView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        [self addSubview:self.pagingView];
    }
    return self;
}

- (void)setPagingViewDataSource:(id<PagingViewDataSource>)thePagingViewDataSource delegate:(id<PagingViewDelegate>)thePagingViewDelegate {
    self.pagingView.dataSource = thePagingViewDataSource;
    self.pagingView.delegate = thePagingViewDelegate;
}

// Reference: http://stackoverflow.com/questions/5618780/uiscrollview-with-pagination-showing-part-of-the-previous-following-pages/5618930#5618930
- (UIView *)hitTest:(CGPoint)thePoint withEvent:(UIEvent *)theEvent {
    if ([self pointInside:thePoint withEvent:theEvent]) {
        UIView *theView = [super hitTest:thePoint withEvent:theEvent];
        if (theView == self) {
            theView = self.pagingView;
        }
        return theView;
    } else {
        return nil;
    }
}

- (void)setPagingViewNeedsReloadData {
    self.pagingView.needsReloadData = YES;
}

@end
