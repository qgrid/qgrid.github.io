---
title: Export to file
group: Plugins
order: 3
---
- [Installation](#installation)
- [How to add excel support?](#how-to-add-excel-support)
- [How to support custom template for export action?](#how-to-support-custom-template-for-export-action)
- [What format types are supported?](#what-format-types-are-supported)
- [Suggested Links](#suggested-links)

Use q-grid export plugin to build data files of required format on client side.

{% docEditor "github/qgrid/ng2-example/tree/export-basic/latest" %}

<a name="#installation">
   Installation
</a>


Install `FileSaver.js` package.

```bash
npm install file-saver
```

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
   rows$ = this.dataService.getRows();
   gridModel = this.grid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.plugin({
         imports: { fileSaver }
      });
   }
}
```

<a name="#how-to-add-excel-support">
   How to add excel support?
</a>

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
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.plugin({
         imports: { fileSaver, xlsx }
      });
   }
}
```

<a name="#how-to-support-custom-template-for-export-action">
   How to support custom template for export action?
</a>

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

<a name="#what-format-types-are-supported">
   What format types are supported?
</a>

Out of box supported next formats.

* `csv`
* `json`
* `xlsx`
* `xml`

<a name="#suggested-links">
   Suggested Links
</a>

* [FileSaver.js](https://www.npmjs.com/package/file-saver)
* [SheetJS](https://www.npmjs.com/package/xlsx)
