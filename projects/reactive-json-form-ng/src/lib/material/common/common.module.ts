/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */


import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { WidgetsCoreModule } from '../../core/index';

import { CardWidgetComponent } from './card/card.component';
import { TableWidgetComponent } from './table/table.component';
import { ContainerWidgetComponent } from './container/container.component';
import { GridContainerWidgetComponent } from './grid-container/gridcontainer.component';
import { TabsWidgetComponent } from './tabs/tabs.component';
import { CodeWidgetComponent } from './code/code.component';

@NgModule({
  imports: [
    MaterialModule,

    WidgetsCoreModule.forRoot({
      widgets: [
        { type: 'card', component: CardWidgetComponent },
        { type: 'table', component: TableWidgetComponent },
        { type: 'container', component: ContainerWidgetComponent},
        { type: 'grid-container', component: GridContainerWidgetComponent},
        { type: 'tabs', component: TabsWidgetComponent},
        { type: 'code', component: CodeWidgetComponent},
      ]
    })
  ],
  declarations: [
    CardWidgetComponent,
    TableWidgetComponent,
    ContainerWidgetComponent,
    GridContainerWidgetComponent,
    TabsWidgetComponent,
    CodeWidgetComponent,
  ],
  exports: []
})
export class CommonWidgetsModule { }
