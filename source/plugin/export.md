---
title: Export to file
group: Plugins
order: 3
---

Use q-grid export plugin to build data files of required format on client side.

{% docEditor "github/qgrid/ng2-example/tree/export-basic/latest" %}

## Installation

Install `FileSaver.js` package.

```bash
npm install file-saver
```

<!-- Add export module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { ExportModule } from 'ng2-qgrid/plugin/export';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      ExportModule
   ]
})
export class AppModule {
}
``` -->

Add angular component inside of q-grid component, after export action should appear, format `type` is required property. Add `file saver` library to the q-grid plugin model.

```typescript
import * as fileSaver from 'file-saver';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"> </q-grid-columns>

         <q-grid-export type="json"> </q-grid-export>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   rows$: Observable<any[]>;
   gridModel: GridModel;

   constructor(dataService: MyDataService, qgrid: Grid) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      this.gridModel.plugin({
         imports: { fileSaver },
      });
   }
}
```

## How to add excel support?

Install `SheetJS` package.

```bash
npm install xlsx
```

Add angular component inside of q-grid component. Add `xlsx` library to the q-grid plugin model.

```typescript
import * as fileSaver from 'file-saver';
import * as xlsx from 'xlsx';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"> </q-grid-columns>

         <q-grid-export type="xlsx"> </q-grid-export>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   rows$: Observable<any[]>;
   gridModel: GridModel;

   constructor(dataService: MyDataService, qgrid: Grid) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      this.gridModel.plugin({
         imports: { fileSaver, xlsx },
      });
   }
}
```

## How to support custom template for export action?

Use ng-template to override default export action template.

```html
<q-grid-export type="csv">
   <ng-template for="trigger" let-$action>
      <button mat-button (click)="$action.execute()">
         Custom export to CSV
      </button>
   </ng-template>
</q-grid-export>
```

## What format types are supported?

Out of box supported next formats.

* `csv`
* `json`
* `xlsx`
* `xml`

## Suggested Links

* [FileSaver.js](https://www.npmjs.com/package/file-saver)
* [SheetJS](https://www.npmjs.com/package/xlsx)
