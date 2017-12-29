import * as typescript from "typescript";
import * as coreJs from "core-js";
import * as zone from "zone";

import { NgModule, Component } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { Http, HttpModule } from "@angular/common/http";
import { AppComponent } from "./app.component";

import { GridModule, Grid, GridService, GridModel } from "ng2-qgrid";
import { ThemeModule } from "ng2-qgrid";

const exampleFactory = (window as any).example;
if (!exampleFactory) {
  throw new Error(`Can't create example component`);
}

const ng = {
  Component,
  Http,
  Grid,
  GridModel,
  GridService
};

const Example = exampleFactory(ng);

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    BrowserAnimationsModule,
    GridModule,
    ThemeModule
  ],
  declarations: [Example],
  bootstrap: [Example],
  providers: []
})
class ExampleModule {}

platformBrowserDynamic().bootstrapModule(ExampleModule);
