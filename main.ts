import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid';


function run(Component) {
  @NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      HttpClientModule,
      BrowserAnimationsModule,
      GridModule,
      ThemeModule
    ],
    declarations: [Component],
    bootstrap: [Component],
    providers: []
  })
  class ExampleModule {}

  platformBrowserDynamic().bootstrapModule(ExampleModule);
}

window.ng = {
  run,
  Component
};
