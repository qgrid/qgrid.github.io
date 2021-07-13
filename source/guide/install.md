---
title: How to install
group: Getting started
order: 1
---

```bash
npm install ng2-qgrid
```

## Add q-grid & theme modules to the application root

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

## Create an angular component

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

## Dependencies

*  @angular/common
*  @angular/core
*  @angular/forms

If you use `material` theme from the q-grid package, you also need to install [angular material](https://material.angular.io/)

* @angular/cdk
* @angular/material

## Development

```bash
git clone https://github.com/qgrid/ng2.git
npm install
npm run start
```

## Browser Support

* Last `Chrome` is supported.
* Last `FireFox` is supported.
* Last `Edge` is supported.

* `Safari` is in progress.
* `IE11` is in progress.

## Licence

Code licensed under MIT license.