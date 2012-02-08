//
//  ReusableView.h
//  Polycliniczz
//
//  Created by Stan Chang Khin Boon on 7/2/12.
//  Copyright (c) 2012 d--buzz. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol ReusableView <NSObject>

@property (nonatomic, readonly, copy) NSString *reuseIdentifier;

- (void)prepareForReuse;

@end
