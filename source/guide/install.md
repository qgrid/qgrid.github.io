---
title: How to install
group: Getting started
order: 1
---

```bash
npm install ng2-qgrid
```

## Add q-grid & theme modules to the application root

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

> The q-grid supports 2 themes out of box `material` and `basic`, the first one requires `@angular/material` to be installed.

## Create an angular component

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
            <q-grid-columns generation="deep">
            </q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
         this.rows$ = dataService.getRows();
   }
}
```

> Only array of objects is supported, if primitive types are used the q-grid won't be able to process it.

## Dependencies

*  @angular/common
*  @angular/core
*  @angular/forms
*  @angular/http

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