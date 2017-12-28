import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GridModule,
    ThemeModule
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class ExampleModule {}

platformBrowserDynamic().bootstrapModule(ExampleModule);
