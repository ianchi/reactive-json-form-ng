/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractWidget, Expressions } from '../../../core/index';

export interface ISetLinkWidgetOptions {
  title: string;
  description: string;
  link: string;
}
@Component({
  selector: 'set-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'settings-row', '(click)': 'clickEvent()' },
})
export class SetLinkWidgetComponent extends AbstractWidget<ISetLinkWidgetOptions> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions, public router: Router) {
    super(cdr, expr);
  }

  clickEvent(): void {
    this.router.navigate([this.options.link], {
      state: { widgetDef: this.content && this.content[0] },
    });
  }
}
