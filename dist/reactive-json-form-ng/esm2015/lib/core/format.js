/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { formatNumber, formatDate } from '@angular/common';
import { Pipe } from '@angular/core';
/**
 * Angular Pipe to format text
 */
export class FormatPipe {
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    transform(value, format) {
        return format ? formatValue(value, format) : value;
    }
}
FormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'format',
                pure: true
            },] },
];
/**
 * @param {?} value
 * @param {?} format
 * @return {?}
 */
export function formatValue(value, format) {
    if (typeof format !== 'string' || value == null)
        return value;
    const /** @type {?} */ re = /^\s*(\w+)\s*(:(["'])([^"']*)\3)?$/;
    const /** @type {?} */ match = re.exec(format);
    if (!match[0])
        return value;
    switch (match[1].toUpperCase()) {
        case 'NUMBER':
            let /** @type {?} */ num;
            num = parseFloat(value);
            return isNaN(num) ? value : formatNumber(num, 'en-US', match[4]);
        case 'DATE':
            return formatDate(value, match[4], 'en-US');
    }
    return value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7O0FBT3BELE1BQU07Ozs7OztJQUNKLFNBQVMsQ0FBQyxLQUFVLEVBQUUsTUFBVztRQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDcEQ7OztZQVBGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsSUFBSTthQUNYOzs7Ozs7O0FBT0QsTUFBTSxzQkFBc0IsS0FBVSxFQUFFLE1BQWM7SUFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzlELHVCQUFNLEVBQUUsR0FBRyxtQ0FBbUMsQ0FBQztJQUUvQyx1QkFBTSxLQUFLLEdBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBRTVCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsS0FBSyxRQUFRO1lBQ1gscUJBQUksR0FBRyxDQUFDO1lBQ1IsR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLEtBQUssTUFBTTtZQUNULE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMvQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7Q0FDZCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgZm9ybWF0TnVtYmVyLCBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIEFuZ3VsYXIgUGlwZSB0byBmb3JtYXQgdGV4dCAqL1xuQFBpcGUoe1xuICBuYW1lOiAnZm9ybWF0JyxcbiAgcHVyZTogdHJ1ZVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBmb3JtYXQ6IGFueSkge1xuICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXRWYWx1ZSh2YWx1ZSwgZm9ybWF0KSA6IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZTogYW55LCBmb3JtYXQ6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGZvcm1hdCAhPT0gJ3N0cmluZycgfHwgdmFsdWUgPT0gbnVsbCkgcmV0dXJuIHZhbHVlO1xuICBjb25zdCByZSA9IC9eXFxzKihcXHcrKVxccyooOihbXCInXSkoW15cIiddKilcXDMpPyQvO1xuXG4gIGNvbnN0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgPSByZS5leGVjKGZvcm1hdCk7XG5cbiAgaWYgKCFtYXRjaFswXSkgcmV0dXJuIHZhbHVlO1xuXG4gIHN3aXRjaCAobWF0Y2hbMV0udG9VcHBlckNhc2UoKSkge1xuICAgIGNhc2UgJ05VTUJFUic6XG4gICAgICBsZXQgbnVtO1xuICAgICAgbnVtID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICByZXR1cm4gaXNOYU4obnVtKSA/IHZhbHVlIDogZm9ybWF0TnVtYmVyKG51bSwgJ2VuLVVTJywgbWF0Y2hbNF0pO1xuICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgcmV0dXJuIGZvcm1hdERhdGUodmFsdWUsIG1hdGNoWzRdLCAnZW4tVVMnKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cbiJdfQ==