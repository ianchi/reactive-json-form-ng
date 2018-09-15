/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { IFieldGroupWidgetDef, IWidgetDef } from '../core/index';

import { ISchema, ISchemaArray, ISchemaObject, ISchemaUI } from './interface';

export function buildUI(schema: ISchema, bind: string): IWidgetDef {
  let widget: IFieldGroupWidgetDef = { widget: '', bind };
  const ui = schema.ui || {};

  switch (schema.type) {
    case 'number':
    case 'integer':
      widget.options = { inputType: 'number' };

    // tslint:disable-next-line:no-switch-case-fall-through
    case 'string':
      widget.widget = hasProp('enum', schema) ? 'autocomplete' : 'input';
      break;

    case 'boolean':
      widget.widget = 'toggle';
      break;

    case 'array':
      widget = buildArray(schema, bind);
      // TODO: add newRow
      break;

    case 'object':
      widget = buildObject(schema, bind);
      break;

    default:
      widget.widget = 'empty';
  }

  if (ui.widget) widget.widget = ui.widget;

  widget.options = { ...schema, ...widget.options, ...ui.options };
  delete widget.options.ui;
  delete widget.options.properties;

  return widget;
}

function buildArray(schema: ISchemaArray, bind: string): IFieldGroupWidgetDef {
  const ui = schema.ui || {},
    widget: IFieldGroupWidgetDef = {
      widget: 'form-array',
      bind,
      exportAs: ui.exportAs || '$model',
      elementAs: ui.elementAs,
      indexAs: ui.indexAs,
    };

  if (Array.isArray(schema.items)) {
    // TODO: express tuple case

    widget.content = schema.items.map(sch => buildUI(sch, `${widget.exportAs}[$index]`));
    if (typeof schema.additionalItems === 'object') {
      widget.options = { additionalItems: true };
      widget.content.push(buildUI(schema.additionalItems, `${widget.exportAs}[$index]`));
    } else widget.options = { additionalItems: false };
  } else if (typeof schema.items === 'object') {
    widget.options = { additionalItems: true };
    widget.content = [buildUI(schema.items, `${widget.exportAs}[$index]`)];
    switch (schema.items.type) {
      case 'object':
        widget.options.newRow = '{}';
        break;
      case 'array':
        widget.options.newRow = '[]';
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
function buildObject(schema: ISchemaObject, bind: string): IFieldGroupWidgetDef {
  const ui: ISchemaUI = schema.ui || {},
    widget: IFieldGroupWidgetDef = {
      widget: 'form',
      exportAs: ui.exportAs || '$model',
      bind,
    };
  if (schema.properties) {
    let keys = Object.keys(schema.properties),
      ordered: string[];
    if (Array.isArray(ui.order)) {
      ordered = ui.order.filter(prop => prop in schema.properties!);
      ordered = ordered.concat(keys.filter(prop => !ordered.includes(prop)));
    } else ordered = keys;

    keys = ordered;

    if (ui.fieldsets) {
      const sets = ui.fieldsets.sets,
        defaultSet =
          typeof ui.fieldsets.default === 'number'
            ? ui.fieldsets.default
            : ui.fieldsets.sets.length;

      if (!sets[defaultSet].fields) sets[defaultSet].fields = [];

      ordered.forEach(prop => {
        const propSchema = schema.properties![prop];
        if (propSchema.ui && typeof propSchema.ui.fieldset !== 'undefined') {
          if (!sets[propSchema.ui.fieldset].fields.includes(prop))
            sets[propSchema.ui.fieldset].fields.push(prop);
        } else {
          for (const fset of sets) {
            if (fset.fields && fset.fields.includes(prop)) return;
          }

          sets[defaultSet].fields.push(prop);
        }
      });

      widget.content = [];
      for (const fset of sets) {
        widget.content.push({
          widget: 'form',
          bind,
          exportAs: widget.exportAs,
          content: fset.fields.map(prop =>
            buildUI(schema.properties![prop], `${widget.exportAs}['${prop}']`)
          ),
        });
      }
      widget.content = {
        widget: 'tabs',
        options: { tabLabels: sets.map(fset => fset.title) },
        content: widget.content,
      };
    } else
      widget.content = ordered.map(prop =>
        buildUI(schema.properties![prop], `${widget.exportAs}['${prop}']`)
      );
  }
  return widget;
}

function hasProp<T>(prop: keyof T, obj: T): boolean {
  // tslint:disable-next-line:prefer-template
  return prop in obj || prop + '=' in obj;
}