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
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core/index';
export class CardWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
CardWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-card',
                template: `<mat-card>
  <mat-card-title *ngIf="title">{{title}}</mat-card-title>
  <mat-card-subtitle *ngIf="description">{{description}}</mat-card-subtitle>
  <mat-card-content>
    <ng-container *ngFor="let element of content" [wdgWidget]="element" [parentContext]="context"></ng-container>
  </mat-card-content>
  <mat-card-actions align="end" *ngIf="actions">
    <ng-container *ngFor="let element of actions" [wdgWidget]="element" [parentContext]="context"></ng-container>
  </mat-card-actions>
</mat-card>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CardWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
function CardWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CardWidgetComponent.prototype.title;
    /** @type {?} */
    CardWidgetComponent.prototype.description;
    /** @type {?} */
    CardWidgetComponent.prototype.actions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvY29tbW9uL2NhcmQvY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLGNBQWMsRUFBYyxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQW1COUUsTUFBTSwwQkFBMkIsU0FBUSxjQUFjOzs7OztJQU1yRCxZQUFZLEdBQXNCLEVBQUUsSUFBaUI7UUFDbkQsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNsQjs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0NBVVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQW5CK0QsaUJBQWlCO1lBQzVDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBJV2lkZ2V0RGVmLCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctY2FyZCcsXG4gIHRlbXBsYXRlOiBgPG1hdC1jYXJkPlxuICA8bWF0LWNhcmQtdGl0bGUgKm5nSWY9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvbWF0LWNhcmQtdGl0bGU+XG4gIDxtYXQtY2FyZC1zdWJ0aXRsZSAqbmdJZj1cImRlc2NyaXB0aW9uXCI+e3tkZXNjcmlwdGlvbn19PC9tYXQtY2FyZC1zdWJ0aXRsZT5cbiAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICA8L21hdC1jYXJkLWNvbnRlbnQ+XG4gIDxtYXQtY2FyZC1hY3Rpb25zIGFsaWduPVwiZW5kXCIgKm5nSWY9XCJhY3Rpb25zXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBhY3Rpb25zXCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICA8L21hdC1jYXJkLWFjdGlvbnM+XG48L21hdC1jYXJkPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGFjdGlvbnM6IElXaWRnZXREZWZbXTtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxufVxuIl19