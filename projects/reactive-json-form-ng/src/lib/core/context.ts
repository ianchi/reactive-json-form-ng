/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export interface IContextDef {
  [identifier: string]: any;
}

/**
 * Helper class to hold context for expression evaluation.
 * It only gives a 'type' to a plain object.
 * It has static methods to manage inheritance and adding properties and builtins
 */
export class Context {
  /** Helper definition of built-in objects */
  static builtinsDef: IContextDef = {
    // Builtin functions:
    parseFloat,
    parseInt,
    isNaN,
    isFinite,

    // Fundamental objects:
    Number,
    Math,
    Date,
    Array,
    JSON,
    Object,
  };

  /** User defined properties */
  [key: string]: any;

  /**
   * Creates a Context object, inheriting from an optional `parent` and adding custom properties
   * and optionally builtin objects
   * @param builtins Boolean. If true adds builtinobjects as public properties,
   */
  static create(
    parent?: Context,
    publicProps?: IContextDef,
    readonlyProps?: IContextDef,
    hiddenProps?: IContextDef,
    builtins?: boolean
  ): Context {
    const context: Context = parent ? Object.create(parent) : new Context();

    if (builtins) Context.defineReadonly(context, Context.builtinsDef);
    if (publicProps) Object.assign(context, publicProps);
    if (readonlyProps) Context.defineReadonly(context, readonlyProps);
    if (hiddenProps) Context.defineHidden(context, hiddenProps);

    return context;
  }

  /** Adds readonly properties to a Context */
  static defineReadonly(context: Context, props: IContextDef): Context {
    // tslint:disable-next-line:forin
    for (const prop in props) {
      Object.defineProperty(context, prop, {
        enumerable: true,
        writable: false,
        value: props[prop],
      });
    }

    return context;
  }

  /** Adds hidden (non enumerable) properties to a Context */
  static defineHidden(context: Context, hiddenProps: IContextDef): Context {
    // tslint:disable-next-line:forin
    for (const prop in hiddenProps) {
      Object.defineProperty(context, prop, {
        enumerable: false,
        writable: true,
        value: hiddenProps[prop],
      });
    }

    return context;
  }

  /** adds public properties only if they don't exist in parent */
  static defineWeak(context: Context, props: IContextDef): Context {
    // tslint:disable-next-line:forin
    for (const prop in props) {
      if (prop in context) continue;
      Object.defineProperty(context, prop, {
        enumerable: true,
        writable: true,
        value: props[prop],
      });
    }

    return context;
  }
}
