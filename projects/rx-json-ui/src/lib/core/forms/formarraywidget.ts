/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AS_OBSERVABLE, isReactive, RxObject } from 'espression-rx';

import { BaseWidget } from '../base/abstractwidget';
import {
  CommonEventsDef,
  ConstrainEvents,
  ConstrainSlots,
  EmptyOptionsDef,
  multilineExpr,
  WidgetDef,
} from '../base/public.interface';
import { Context, Expressions } from '../expressions/index';

import { FieldControl } from './fieldcontrol';
import { FORM_CONTROL } from './formfieldwidget';

export interface ArrayEventsDef extends CommonEventsDef {
  /**
   * Expression that must return the new object to add to the array.
   * If it is empty or returns undefined, no row is added
   * When the handler is present the button is added
   */
  onNewRow?: multilineExpr;
  /**
   * Emitted when a row is about to be deleted
   * It receives `$idx` in with the index of the element about to be removed.
   * If the expression returns false, the operation is canceled.
   * The handler must be present for the delete action to be available
   */
  onDeleteRow?: multilineExpr;
}

export class AbstractArrayWidgetComponent<
  T extends EmptyOptionsDef,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> & ArrayEventsDef = ArrayEventsDef
> extends BaseWidget<T, S, E, true> {
  formArray: FormArray | undefined;
  boundData: any[] | undefined;

  rowContext: Context[] = [];
  exportAs = '$model';
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: WidgetDef<T, S, E, true>): WidgetDef<T, S, E, true> {
    // get bound model
    if (!def.bind) throw new Error('Form field widgets must have a "bind" property defined');

    this.formArray = new FormArray([]);

    // register with parent form, if any
    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl('control', this.formArray);
      else if (parentForm instanceof FormArray) parentForm.push(this.formArray);
    }

    // save this FormArray as parent form for the children
    Context.defineHidden(this.context, {
      [FORM_CONTROL]: new FieldControl(this.formArray),
    });

    // create a Store for the variables
    // binding is always on the parent context directly, so it can't get shadowed in the child
    // and if the variable is created, it can still be accessed after child's destruction
    const lvalue = this.expr.lvalue(def.bind, this.context.$parentContext);

    if (!lvalue)
      throw new Error('Form field "bind" property must be an identifier or member expression');

    if (!isReactive(lvalue.o[lvalue.m]) || !Array.isArray(lvalue.o[lvalue.m])) {
      if (!(lvalue.m in lvalue.o)) lvalue.o[lvalue.m] = RxObject([], true);
      else throw new Error(`Bound Key '${def.bind}' must be Array of Reactive Type`);
    }
    this.exportAs = def.exportAs || '$model';
    this.context[this.exportAs] = this.boundData = lvalue.o[lvalue.m];

    // sync the row contexts if the data changed
    this.addSubscription = (<any>this.boundData)[AS_OBSERVABLE]().subscribe((arr: any[]) => {
      this.rowContext = arr.map((data: any, idx: number) =>
        // keep old Context if no change, so no DOM change is triggered
        !this.rowContext[idx] ||
        this.rowContext[idx].$data !== data ||
        this.rowContext[idx].$index !== idx
          ? Context.create(this.context, undefined, {
              $data: data,
              $index: idx,
            })
          : this.rowContext[idx]
      );
      this._cdr.markForCheck();
    });
    return def;
  }

  addRow(): void {
    this.emmit('onNewRow', undefined, newRow => {
      if (typeof newRow === 'object' && !isReactive(newRow)) newRow = RxObject(newRow);
      if (typeof newRow !== 'undefined') this.boundData!.push(newRow);
    });
  }

  deleteRow(idx: number): void {
    this.emmit('onDeleteRow', { $idx: idx }, result => result && this.boundData!.splice(idx, 1));
  }
}
