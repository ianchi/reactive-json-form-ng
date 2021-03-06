/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>, contributors.
 * Licensed under the MIT license.
 */

import { SchemaNumber, ValidatorFn } from '../interface';

import { baseValidator, ERROR_MSG, ERR_TYPE } from './base';

export const ENUM_MIN = 10;
export const ENUM_MAX = 11;
export const ENUM_EMIN = 12;
export const ENUM_EMAX = 13;
export const ENUM_MULT = 14;

ERROR_MSG[ENUM_MIN] = "`Must be greater or equal to '${$err.minimum}'`";
ERROR_MSG[ENUM_MAX] = "`Must be lower or equal to '${$err.maximum}'`";
ERROR_MSG[ENUM_EMIN] = "`Must be greater than '${$err.exclusiveMinimum}'`";
ERROR_MSG[ENUM_EMAX] = "`Must be lower than '${$err.exclusiveMaximum}'`";
ERROR_MSG[ENUM_MULT] = "`Must be multiple of '${$err.multipleOf}'`";

export function numberValidator(schema: SchemaNumber): ValidatorFn {
  const isInteger = schema.type === 'integer';
  const multipleOf = typeof schema.multipleOf === 'number' ? schema.multipleOf : null;
  const minimum = typeof schema.minimum === 'number' ? schema.minimum : null;
  const maximum = typeof schema.maximum === 'number' ? schema.maximum : null;
  const exclusiveMinimum =
    typeof schema.exclusiveMinimum === 'number' ? schema.exclusiveMinimum : null;
  const exclusiveMaximum =
    typeof schema.exclusiveMaximum === 'number' ? schema.exclusiveMaximum : null;
  const base = baseValidator(schema);

  return (value: any) => {
    if (value === '' || typeof value === 'undefined' || value === null) return base(value);

    if (typeof value === 'string') {
      value = parseFloat(value);
      if (isNaN(value)) value = undefined;
    }
    if (typeof value !== 'number')
      return { code: ERR_TYPE, type: isInteger ? 'integer' : 'number' };
    if (isInteger && !Number.isInteger(value)) return { code: ERR_TYPE, type: 'integer' };

    if (maximum !== null && value > maximum) return { code: ENUM_MAX, maximum };
    if (minimum !== null && value < minimum) return { code: ENUM_MIN, minimum };
    if (exclusiveMaximum !== null && value >= exclusiveMaximum)
      return { code: ENUM_EMAX, exclusiveMaximum };
    if (exclusiveMinimum !== null && value <= exclusiveMinimum)
      return { code: ENUM_EMIN, exclusiveMinimum };

    if (multipleOf && value % multipleOf !== 0) return { code: ENUM_MULT, multipleOf };

    return base(value);
  };
}
