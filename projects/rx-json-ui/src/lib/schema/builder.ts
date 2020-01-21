/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractFieldWidgetDef, AbstractWidgetDef } from '../core/index';

import { Schema, SchemaArray, SchemaObject, SchemaUI } from './interface';

export const BUILDER_WIDGETS = {
  default: 'default',
  number: 'set-input',
  integer: 'set-input',
  string: 'set-input',
  enum: 'set-select',
  boolean: 'set-toggle',
  array: 'set-rowarray',
  list: 'set-list',
  object: 'set-expansion',
  set: 'set-expansion',
};

export function buildUI(schema: Schema, bind: string, ui?: SchemaUI): AbstractWidgetDef {
  let widget: AbstractWidgetDef = {
    widget: BUILDER_WIDGETS.default,
    bind,
    options: {},
    events: {},
  };

  if (!schema) return widget;
  ui = { ...schema.ui, ...ui };

  switch (schema.type) {
    case 'integer':
      widget.options!.multipleOf = 1;

    // tslint:disable-next-line:no-switch-case-fall-through
    case 'number':
      widget.options!.inputType = 'number';

    // tslint:disable-next-line:no-switch-case-fall-through
    case 'string':
      widget.widget = hasProp('enum', schema) ? BUILDER_WIDGETS.enum : BUILDER_WIDGETS.string;
      break;

    case 'boolean':
      widget.widget = BUILDER_WIDGETS.boolean;
      break;

    case 'array':
      widget = buildArray(schema, bind);
      // TODO: add newRow
      break;

    case 'object':
      widget = buildObject(schema, bind, ui);
      break;

    default:
      widget.widget = BUILDER_WIDGETS.default;
  }

  if (ui.widget) widget.widget = ui.widget;

  if (ui.events) {
    for (const e in ui.events) widget.events![e] = ui.events[e];
  }
  if (schema['depends=']) widget.if = schema['depends='];

  widget.options = { ...schema, ...widget.options, ...ui.options };
  delete widget.options!.ui;
  delete widget.options!.properties;
  delete widget.options!['depends='];
  return widget;
}

function buildArray(schema: SchemaArray, bind: string): AbstractWidgetDef {
  const widget: AbstractWidgetDef = {
    widget: BUILDER_WIDGETS.list,
    bind,
  };

  if (Array.isArray(schema.items)) {
    // TODO: express tuple case

    widget.content = schema.items.map(sch => buildUI(sch, `$row.array[$row.index]`));
    if (typeof schema.additionalItems === 'object') {
      widget.options = { additionalItems: true };
      widget.content.push(buildUI(schema.additionalItems, `$row.array[$row.index]`));
    } else widget.options = { additionalItems: false };
  } else if (typeof schema.items === 'object') {
    widget.options = { additionalItems: true };
    widget.content = [buildUI(schema.items, `$row.array[$row.index]`)];
    switch (schema.items.type) {
      case 'object':
        widget.options.newRow = '{}';
        widget.widget = BUILDER_WIDGETS.array;
        break;
      case 'array':
        widget.options.newRow = '[]';
        widget.widget = BUILDER_WIDGETS.array;
        break;
      case 'string':
        widget.options.newRow = '""';
        break;
      case 'number':
      case 'integer':
        widget.options.newRow = '0';
        break;
      case 'boolean':
        widget.options.newRow = 'false';
        break;
      default:
        widget.options.newRow = '';
        break;
    }
  }

  return widget;
}
function buildObject(schema: SchemaObject, bind: string, ui?: SchemaUI): AbstractWidgetDef {
  const widget: AbstractFieldWidgetDef = {
    widget: BUILDER_WIDGETS.object,
    bind,
  };

  ui = ui || {};
  const include = Array.isArray(ui.include) ? ui.include : ['*'];
  const exclude = Array.isArray(ui.exclude) ? ui.exclude : [];

  if (schema.properties) {
    const allKeys = Object.keys(schema.properties);
    const includedKeys: string[] = [];
    let hasRest = false,
      hasSets = false;

    widget.content = [] as AbstractWidgetDef[];

    // get all included properties
    for (const fieldOrSet of include) {
      if (Array.isArray(fieldOrSet)) {
        hasSets = true;
        for (const field of fieldOrSet) {
          if (field === '*') hasRest = true;
          includedKeys.push(field);
        }
      } else {
        if (fieldOrSet === '*') hasRest = true;
        includedKeys.push(fieldOrSet);
      }
    }

    // calculate rest properties
    const restKeys = !hasRest
      ? []
      : allKeys.filter(key => !includedKeys.includes(key)).filter(key => !exclude.includes(key));

    function addProp(key: string, content: AbstractWidgetDef[]): void {
      if (allKeys.includes(key)) {
        content.push(buildUI(schema.properties![key], `${bind}['${key}']`));
      } else if (key === '*')
        content.push(
          ...restKeys.map(rest => buildUI(schema.properties![rest], `${bind}['${rest}']`))
        );
    }

    for (let i = 0; i < include.length; i++) {
      const fieldOrSet = include[i];
      // check if it is a set
      if (Array.isArray(fieldOrSet)) {
        const setWidget: AbstractWidgetDef = { widget: BUILDER_WIDGETS.object, content: [] };
        setWidget.content = [];
        if (ui.titles && ui.titles[i]) setWidget.options = { title: ui.titles[i] };

        for (const key of fieldOrSet) addProp(key, setWidget.content as AbstractWidgetDef[]);
        widget.content.push(setWidget);
      } else if (!hasSets) {
        addProp(fieldOrSet, widget.content as AbstractWidgetDef[]);
      }
    }

    if (hasSets) {
      widget.widget = BUILDER_WIDGETS.set;
      widget.options = { titles: ui.titles };
    }
  }
  return widget;
}

function hasProp<T>(prop: keyof T, obj: T): boolean {
  // tslint:disable-next-line:prefer-template
  return prop in obj || prop + '=' in obj;
}
