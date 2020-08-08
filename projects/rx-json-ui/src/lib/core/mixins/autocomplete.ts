/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  BindWidgetDef,
  ConstrainEvents,
  ConstrainSlots,
  FieldEventDef,
  WidgetDef,
} from '../base/public.interface';

import { SelectWidgetMixin, SelectWidgetOptions } from './select';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class AutocompleteWidgetMixin<
  O extends SelectWidgetOptions = SelectWidgetOptions,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> = FieldEventDef
> extends SelectWidgetMixin<O, S, E> {
  /** Array with filtered options to display in dropdown */
  filteredOptions$: Observable<any[]> | undefined;
  private enumSubject = new Subject<any>();

  updateEntries(): void {
    super.updateEntries();

    // We need to update filtered options both when text or enum changes
    // so emit on `enum` to later merge with value changes
    this.enumSubject.next(undefined);
  }

  dynOnSetup(def: WidgetDef<O, S, E, BindWidgetDef>): WidgetDef<O, S, E, BindWidgetDef> {
    const result = super.dynOnSetup(def);
    if (!this.formControl) return def;

    // We need to update filtered options both when text or enum changes
    this.filteredOptions$ = merge(this.enumSubject, this.formControl.valueChanges).pipe(
      map((value) => this.filter(value))
    );

    return result;
  }

  fldSetFormValue(val: any): void {
    super.fldSetFormValue(val);
    if (this.formControl) this.filter(this.formControl.value);
  }

  /**
   * Filters the available options with the typed text
   * filter is made by label
   */
  private filter(value: string): any[] {
    if (typeof value === 'undefined') return this.values;
    const filterValue = (typeof value === 'string' && value.toLowerCase()) || value;

    return this.values.filter((_option, idx) => {
      const opt =
        typeof this.descriptions[idx] === 'string'
          ? this.descriptions[idx].toLowerCase()
          : typeof this.descriptions[idx] === 'undefined' || this.descriptions[idx] === null
          ? ''
          : this.descriptions[idx].toString();
      return opt.includes(filterValue);
    });
  }
}
