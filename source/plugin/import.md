---
title: Import from file
group: Plugins
order: 4
---
- [Installation](#installation)
- [How to add excel support?](#how-to-add-excel-support)
- [How to support custom template for import action?](#how-to-support-custom-template-for-import-action)
- [What format types are supported?](#what-format-types-are-supported)
- [Suggested Links](#suggested-links)

Use q-grid import plugin to fill in rows with data from files on client side.

<a name="#installation">
   Installation
</a>

Add angular component inside of q-grid component, after that import should appear.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
        <q-grid-columns generation="deep">
        </q-grid-columns>

        <q-grid-import>
        </q-grid-import>
      </q-grid>
   `
})
export class MyComponent {
  rows$ = this.dataService.getRows();

  constructor(private dataService: MyDataService) {}
}
```

<a name="#how-to-add-excel-support">
   How to add excel support?
</a>

Install `SheetJS` package.

```bash
npm install xlsx
```

Add `xlsx` library to the q-grid plugin model.

```typescript
import * as xlsx from 'xlsx';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-import>
         </q-grid-import>
      </q-grid>
   `
})
export class MyComponent {
   rows$ = this.dataService.getRows();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.qgrid.model().plugin({
         imports: {
            'xlsx': xlsx
         },
      });
   }
}
```

<a name="#how-to-support-custom-template for import action?">
   How to support custom template for import action?
</a>

Use ng-template to override default import action template.

```html
<q-grid-import>
   <ng-template for="trigger" let-$action>
      <button mat-button (click)="$action.execute()">
         Custom import
      </button>
   </ng-template>
</q-grid-import>
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

* [SheetJS](http://github.com/SheetJS/js-xlsx)
