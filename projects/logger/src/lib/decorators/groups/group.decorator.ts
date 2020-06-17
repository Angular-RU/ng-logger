import { Type } from '@angular/core';

import { groupDecoratorFactory } from './group.common';
import { Any, Callback, DecoratorMethod, Fn } from "../../interfaces/logger.internal";
import { GroupLevel, LoggerLevel } from '../../interfaces/logger.external';

export function Group(title: string | Callback<Any>, level: LoggerLevel = LoggerLevel.INFO): DecoratorMethod {
    return (_target: Type<unknown>, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const method: Callback = descriptor.value;

        descriptor.value = function(...args: Any[]): unknown {
            return groupDecoratorFactory(level, GroupLevel.GROUP, method as Fn, title, args, this as any);
        };

        return descriptor;
    };
}
