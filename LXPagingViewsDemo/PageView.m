//
//  PageView.m
//  LXPagingViewsDemo
//
//  Created by Stan Chang Khin Boon on 9/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import "PageView.h"

@implementation PageView

@synthesize textLabel = _textLabel;

- (UILabel *)textLabel {
    if (_textLabel == nil) {
        _textLabel = [[UILabel alloc] initWithFrame:self.bounds];
        _textLabel.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _textLabel.font = [UIFont boldSystemFontOfSize:48.0f];
        _textLabel.backgroundColor = [UIColor clearColor];
        _textLabel.textAlignment = UITextAlignmentCenter;
        [self addSubview:_textLabel];
    }
    return _textLabel;
}

- (NSString *)reuseIdentifier {
    return NSStringFromClass([self class]);
}

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
    }
    return self;
}

- (void)prepareForReuse {
    self.backgroundColor = [UIColor clearColor];
    self.textLabel.text = nil;
}

@end
