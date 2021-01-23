/*
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  Input,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  Optional,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { RxObject } from 'espression-rx';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { Context, Expressions, ROOT_EXPR_CONTEXT } from '../expressions/index';
import { WidgetRegistry } from '../widgetregistry.service';

import { AbstractWidget } from './abstractwidget';
import { AbstractWidgetDef } from './public.interface';

/**
 * Directive to include a widget tree in a page.
 * It is mainly used with a `ng-container`:
 * ```
 * <ng-container [wdgWidget]="widgetDef" [parentContext]="context">
 * </ng-container>
 * ```
 */
@Directive({ selector: '[wdgWidget]' }) // eslint-disable-line @angular-eslint/directive-selector
export class WidgetDirective implements OnChanges, OnDestroy {
  /** Object with the widget definition */
  @Input('wdgWidget')
  widgetDef: AbstractWidgetDef | undefined;
  @Input()
  parentContext: Context | undefined;
  structuralContext: Context | undefined;
  private subscriptions: Subscription | undefined;
  private componentFactory: ComponentFactory<AbstractWidget> | undefined;
  private widgetRef: Array<ComponentRef<AbstractWidget>> = [];

  private forDiffer: IterableDiffer<any> | undefined;
  private forTrackBy: TrackByFunction<any> | undefined;
  private structural$: Observable<any> | undefined;

  constructor(
    private container: ViewContainerRef,
    private registry: WidgetRegistry,
    private cfr: ComponentFactoryResolver,
    @Optional()
    @Inject(ROOT_EXPR_CONTEXT)
    private rootContext: Context | undefined,
    private expr: Expressions,
    private differs: IterableDiffers
  ) {}

  getWidgets(): AbstractWidget[] {
    return this.widgetRef.map((ref) => ref.instance);
  }
  /**
   * Initializes the widget instantiation process.
   * Recreates everything on each change of inputs.
   * It evaluates the `if` / `for` structural properties and creates the widgets accordingly
   */
  ngOnChanges(): void {
    // if we already had created a widget, destroy it
    this.unsuscribeStructural();
    this.destroyWidgets();

    // make sure we have a valid widget definition
    if (!this.widgetDef) return;
    this.validateWidgetDef();

    // if a specific context wasn't provided, create one parent context from the rootContext
    // adding making '$' available as a RxObject to bind fields (in case no form widget is
    // in the view tree)
    this.parentContext =
      this.parentContext || Context.create(this.rootContext, undefined, { $: RxObject({}, true) });
    this.structuralContext = Context.create(this.parentContext);

    // create the structural observable
    if (this.widgetDef.if) {
      const ifExpr = Array.isArray(this.widgetDef.if)
        ? this.widgetDef.if.join('\n')
        : this.widgetDef.if;
      this.structural$ = this.expr.eval(ifExpr, this.structuralContext, true).pipe(
        map((v) => !!v),
        distinctUntilChanged()
      );
    } else this.structural$ = of(true);

    if (this.widgetDef.for) {
      // if we have an `if` and a `for` first evaluate the `if`
      // and each time it evaluates to truthy evaluate the `for`
      const forExpr = Array.isArray(this.widgetDef.for)
        ? this.widgetDef.for.join('\n')
        : this.widgetDef.for;
      this.structural$ = this.structural$.pipe(
        switchMap((val) => {
          return val
            ? this.expr
                .eval(forExpr, this.structuralContext!, true)
                .pipe(map((a) => (Array.isArray(a) ? a : [])))
            : of([]);
        })
      );
    }

    this.structural$ = this.structural$.pipe(shareReplay({ bufferSize: 1, refCount: true }));

    this.subscriptions = this.structural$.subscribe((val) => {
      // check if the `if` was false
      if (val === false) this.destroyWidgets();
      else this.createWidgets(val);
    });
  }

  createWidgets(data: true | any[]): void {
    if (!this.componentFactory || !this.widgetDef) return;

    // check if we have a `for` structure directive
    if (data === true) {
      this.widgetRef = [this.container.createComponent(this.componentFactory)];

      const ctx = Context.create(this.structuralContext);

      Context.defineReadonly(ctx, {
        $self: ctx,
        $parent: this.parentContext,
      });

      this.widgetRef[0].instance.setup(this.widgetDef, ctx);
    } else {
      this.setFor(data);
    }
  }

  createForWidget(data: any, index: number | null): ComponentRef<AbstractWidget> {
    if (!this.componentFactory || !this.widgetDef || index === null)
      throw new Error('Invalid widget definition');

    // expose a read-only `$for` reactive property with the item's `data` and `index`
    const context = Context.create(this.structuralContext);
    Context.defineReadonly(context, {
      $self: context,
      $parent: this.parentContext,
      $for: {
        data: new BehaviorSubject(data),
        index: new BehaviorSubject(index),
        array: this.structural$,
      },
    });

    const widgetRef = this.container.createComponent(this.componentFactory, index);
    widgetRef.instance.setup(this.widgetDef, context);

    return widgetRef;
  }

  ngOnDestroy(): void {
    this.unsuscribeStructural();
    this.destroyWidgets();
  }
  /** Unsubscribes from the structural properties expressions */
  unsuscribeStructural(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      this.subscriptions = undefined;
    }
  }

  destroyWidgets(): void {
    if (!this.widgetRef) return;

    this.widgetRef.map((ref) => ref.destroy());
    this.widgetRef = [];
  }

  /**
   * Checks the basic validity of the widget definition and that it is properly registered
   * Initializes the componentFactory
   */
  validateWidgetDef(): boolean {
    this.componentFactory = undefined;

    if (
      typeof this.widgetDef !== 'object' ||
      Array.isArray(this.widgetDef) ||
      !this.widgetDef.widget
    ) {
      this.widgetDef = undefined;
      throw new Error('Invalid widget definition, must be object with "widget" property');
    }
    const widgetClass = this.registry.get(this.widgetDef.widget);

    if (!widgetClass) {
      const type = this.widgetDef.widget;
      this.widgetDef = undefined;
      throw new Error(`Widget "${type}" is not registered`);
    }
    this.componentFactory = this.cfr.resolveComponentFactory(widgetClass);

    return true;
  }

  // `for` routines, based on code borrowed from Angular `ngFor`

  /**
   * Applies the changes when needed.
   */
  private setFor(value: any[]): void {
    if (!this.forDiffer && value) {
      try {
        if (
          this.structuralContext &&
          this.structuralContext.hasOwnProperty('$trackBy') &&
          typeof this.structuralContext.$trackBy === 'function'
        )
          this.forTrackBy = this.structuralContext.$trackBy;
        this.forDiffer = this.differs.find(value).create(this.forTrackBy);
      } catch {
        throw new Error(`Cannot find a differ supporting object '${value}'`);
      }
    }
    if (this.forDiffer) {
      const changes = this.forDiffer.diff(value);
      if (changes) this.applyForChanges(changes);
    }
  }

  private applyForChanges(changes: IterableChanges<any>): void {
    changes.forEachOperation(
      (
        record: IterableChangeRecord<any>,
        adjustedPreviousIndex: number | null,
        currentIndex: number | null
      ) => {
        if (record.previousIndex == null && currentIndex !== null) {
          // added elements
          const component = this.createForWidget(record.item, currentIndex);

          this.widgetRef.splice(currentIndex, 0, component);
        } else if (currentIndex == null && adjustedPreviousIndex !== null) {
          // removed elements
          this.container.remove(adjustedPreviousIndex);
          this.widgetRef.splice(adjustedPreviousIndex, 1);
        } else if (adjustedPreviousIndex !== null && currentIndex !== null) {
          // moved elements
          const view = this.container.get(adjustedPreviousIndex)!;
          this.container.move(view, currentIndex);

          const component = this.widgetRef[adjustedPreviousIndex];
          this.widgetRef.splice(adjustedPreviousIndex, 1);
          this.widgetRef.splice(currentIndex, 0, component);

          // emit updated index
          this.widgetRef[currentIndex].instance.context.$for.index.next(currentIndex);
        }
      }
    );

    // the identity of the item changed (even if the trackBy returned the same ID, the objects have different references )
    // emit updated data
    changes.forEachIdentityChange((record: IterableChangeRecord<any>) => {
      if (record.currentIndex !== null && record.previousIndex !== null)
        this.widgetRef[record.currentIndex].instance.context.$for.data.next(record.item);
    });
  }
}
