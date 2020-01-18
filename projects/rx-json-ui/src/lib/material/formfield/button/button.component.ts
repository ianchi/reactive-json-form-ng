/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, ButtonWidgetEvents } from '../../../core/index';

export interface ButtonWidgetOptions {
  title: string;
  disabled: boolean;
}

@Component({
  selector: 'wdg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonWidgetComponent extends BaseWidget<
  ButtonWidgetOptions,
  undefined,
  ButtonWidgetEvents
> {}
