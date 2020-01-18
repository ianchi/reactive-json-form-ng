/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaNumber, SchemaString } from '../../schema';
import { CommonEventsDef, multilineExpr, SimpleContentDef } from '../base/public.interface';

export type ButtonWidgetEvents = CommonEventsDef & {
  /** Event emitted when the button is clicked */
  onClick: multilineExpr;
};

export interface TitleOption {
  title?: string;
}

export interface TitleDescOption {
  title?: string;
  description?: string;
}

export type InputWidgetOptions = (Partial<SchemaString> | Partial<SchemaNumber>) & {
  inputType?: string;
};

// tslint:disable-next-line: interface-over-type-literal
export type PopupSlotsDef = {
  main: SimpleContentDef;
  actions: SimpleContentDef;
};
