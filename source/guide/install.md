---
title: How to install
group: Getting started
order: 1
---

- [Add q-grid & theme modules to the application root](#add-q-grid-theme-modules-to-the-application-root)
- [Create an angular component](#create-an-angular-component)
- [Dependencies](#dependencies)
- [Development](#development)
- [Browser Support](#browser-support)
- [Licence](#licence)


```bash
npm install ng2-qgrid
```

<a name="add-q-grid-theme-modules-to-the-application-root" href="#add-q-grid-theme-modules-to-the-application-root">
   Add q-grid & theme modules to the application root
</a>


There are 2 themes out of box `material` and `basic`.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';

@NgModule({
   imports: [
      GridModule,
      ThemeModule
   ]
})
export class AppModule {
}
```

> Material theme requires `@angular/material` to be installed.

<a name="create-an-angular-component" href="#create-an-angular-component">
   Create an angular component
</a>


Use column generation mode for a quick start.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async"
              [model]="gridModel">
      </q-grid>
      `
})
export class MyComponent {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid
      .model()
      .columnList({
         generation: 'deep'
      });

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }
}
```

<a name="dependencies" href="#dependencies">
   Dependencies
</a>

*  @angular/common
*  @angular/core
*  @angular/forms

If you use `material` theme from the q-grid package, you also need to install [angular material](https://material.angular.io/)

* @angular/cdk
* @angular/material

<a name="development" href="#development">
   Development
</a>

```bash
git clone https://github.com/qgrid/ng2.git
npm install
npm run start
```

<a name="browser-support" href="#browser-support">
   Browser Support
</a>

* Last `Chrome` is supported.
* Last `FireFox` is supported.
* Last `Edge` is supported.

* `Safari` is in progress.
* `IE11` is in progress.

<a name="licence" href="#licence">
   Licence
</a>

Code licensed under MIT license.