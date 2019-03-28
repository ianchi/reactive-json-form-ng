/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { RxObject } from 'espression-rx';
import {
  CommonWidgetsModule,
  Context,
  expressionProvider,
  FormFieldWidgetsModule,
  ROOT_EXPR_CONTEXT,
  RoutedWidgetComponent,
  SettingsWidgetsModule,
} from 'reactive-json-form-ng';

import { AppComponent } from './app.component';

@Injectable({ providedIn: 'root' })
export class Backend implements Resolve<any> {
  constructor(private _http: HttpClient) {}
  resolve(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._http.get(`assets${state.url}${state.url === '/' ? 'settings' : ''}.json`);
  }
}

export const appRoutes: Routes = [
  { path: '', component: RoutedWidgetComponent, resolve: { widgetDef: Backend } },
  { path: '**', component: RoutedWidgetComponent, resolve: { widgetDef: Backend } },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    CommonWidgetsModule,
    HttpClientModule,
    FormFieldWidgetsModule,
    BrowserAnimationsModule,
    SettingsWidgetsModule,
  ],
  providers: [
    expressionProvider,
    {
      provide: ROOT_EXPR_CONTEXT,
      useValue: Context.create(
        undefined,
        {
          RxObject,
          data: RxObject(
            {
              dropbear: [
                { port: 22, interfaces: ['lan', 'vpn'] },
                { port: 8022, interfaces: ['wan'] },
              ],
              children: [
                {
                  subfield1: 'a',
                  subfield2: 'b',
                },
                {
                  subfield1: 'c',
                  subfield2: 'f',
                },
              ],
            },
            true
          ),
        },
        undefined,
        undefined,
        true
      ),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
