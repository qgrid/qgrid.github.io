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
npm install ng2-qgrid --save
```

<a name="add-q-grid-theme-modules-to-the-application-root"   href="#add-q-grid-theme-modules-to-the-application-root">
   Add q-grid & theme modules to the application root
</a>

There are 2 themes out of box: `material` and `basic`(experimental).

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

> If you use q-grid `material` theme install [angular material](https://material.angular.io/guide/getting-started)


<a name="create-an-angular-component" href="#create-an-angular-component">
   Create an angular component
</a>

Use column `generation` mode for a quick start.

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
      .model();
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

Next libraries should be installed separately to support client side export and import features.

*  xlsx
*  file-saver
*  @types/xlsx
*  @types/file-saver

<a name="development" href="#development">
   Develop the q-grid
</a>

q-grid uses [yarn](https://classic.yarnpkg.com/lang/en/docs/install) to manage packages, after installed just execute the command line

```bash
git clone https://github.com/qgrid/ng2.git
yarn install
yarn start
```

<a name="stackblitz" href="#stackblitz">
   Stackblitz
</a>

For the reason unknown [stackblitz](https://stackblitz.com/) requires to install next dependencies in addition to the ` ng2-qgrid`

* @qgrid/core
* @qgrid/plugins
* @qgrid/ngx
* @qgrid/ngx-plugins

<a name="license" href="#license">
   License
</a>

Code licensed under MIT license.
