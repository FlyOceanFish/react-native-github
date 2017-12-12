//
//  DropDownMenu.m
//  MyRN
//
//  Created by YTO on 2017/12/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "DropDownMenu.h"
#import "KxMenu.h"
#import <React/RCTConvert.h>

@import UIKit;

@interface DropDownMenu()
@property (nonatomic,copy)RCTResponseSenderBlock callback;
@end

@implementation DropDownMenu

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showMenu:(NSArray *)names rect:rect callback:(RCTResponseSenderBlock)callback)
{
  NSDictionary *dic = [RCTConvert NSDictionary:rect];
  NSLog(@"%@",dic);

  self.callback = callback;
  NSMutableArray *arrays = [NSMutableArray array];
  for (int i = 0; i<names.count; i++) {
    KxMenuItem *item = [KxMenuItem menuItem:names[i]
                                      image:nil
                                     target:self
                                     action:@selector(menuItemAction:)];
    item.index = i;
    [arrays addObject:item];
  }
  dispatch_async(dispatch_get_main_queue(), ^{
    [KxMenu showMenuInView:[UIApplication sharedApplication].keyWindow
                  fromRect:CGRectMake([dic[@"ox"] floatValue], [dic[@"oy"] floatValue]+20, [dic[@"width"] floatValue], [dic[@"height"] floatValue])
                 menuItems:arrays];
  });
}
- (void)menuItemAction:(KxMenuItem *)item{
  self.callback(@[@(item.index)]);
}
@end
