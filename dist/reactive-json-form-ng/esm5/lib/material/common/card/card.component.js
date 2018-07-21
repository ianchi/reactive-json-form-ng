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
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core';
var CardWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CardWidgetComponent, _super);
    function CardWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    CardWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-card',
                    template: "<mat-card>\n  <mat-card-title *ngIf=\"title\">{{title}}</mat-card-title>\n  <mat-card-subtitle *ngIf=\"description\">{{description}}</mat-card-subtitle>\n  <mat-card-content>\n    <ng-container *ngFor=\"let element of content\" [wdgWidget]=\"element\" [parentContext]=\"context\"></ng-container>\n  </mat-card-content>\n  <mat-card-actions align=\"end\" *ngIf=\"actions\">\n    <ng-container *ngFor=\"let element of actions\" [wdgWidget]=\"element\" [parentContext]=\"context\"></ng-container>\n  </mat-card-actions>\n</mat-card>\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CardWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return CardWidgetComponent;
}(AbstractWidget));
export { CardWidgetComponent };
function CardWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CardWidgetComponent.prototype.title;
    /** @type {?} */
    CardWidgetComponent.prototype.description;
    /** @type {?} */
    CardWidgetComponent.prototype.actions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvY29tbW9uL2NhcmQvY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxjQUFjLEVBQWMsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQW1CL0IsK0NBQWM7SUFNckQsNkJBQVksR0FBc0IsRUFBRSxJQUFpQjtlQUNuRCxrQkFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDO0tBQ2pCOztnQkF6QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUscWhCQVVYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQW5CK0QsaUJBQWlCO2dCQUM1QyxXQUFXOzs4QkFUaEQ7RUE0QnlDLGNBQWM7U0FBMUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgSVdpZGdldERlZiwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWNhcmQnLFxuICB0ZW1wbGF0ZTogYDxtYXQtY2FyZD5cbiAgPG1hdC1jYXJkLXRpdGxlICpuZ0lmPVwidGl0bGVcIj57e3RpdGxlfX08L21hdC1jYXJkLXRpdGxlPlxuICA8bWF0LWNhcmQtc3VidGl0bGUgKm5nSWY9XCJkZXNjcmlwdGlvblwiPnt7ZGVzY3JpcHRpb259fTwvbWF0LWNhcmQtc3VidGl0bGU+XG4gIDxtYXQtY2FyZC1jb250ZW50PlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtY2FyZC1jb250ZW50PlxuICA8bWF0LWNhcmQtYWN0aW9ucyBhbGlnbj1cImVuZFwiICpuZ0lmPVwiYWN0aW9uc1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgYWN0aW9uc1wiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtY2FyZC1hY3Rpb25zPlxuPC9tYXQtY2FyZD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBhY3Rpb25zOiBJV2lkZ2V0RGVmW107XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbn1cbiJdfQ==