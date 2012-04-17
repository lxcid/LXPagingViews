//
//  PeepingPagingView.m
//  Polycliniczz
//
//  Created by Stan Chang Khin Boon on 9/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import "PeepingPagingView.h"
#import "PagingView.h"

@implementation PeepingPagingView

@synthesize edgeInsets = _edgeInsets;
@synthesize pagingView = _pagingView;

- (void)setFrame:(CGRect)theFrame {
    [super setFrame:theFrame];
    self.pagingView.frame = UIEdgeInsetsInsetRect(self.bounds, self.edgeInsets);
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
        return self.pagingView;
    } else {
        return nil;
    }
}

- (void)setPagingViewNeedsReloadData {
    self.pagingView.needsReloadData = YES;
}

@end
