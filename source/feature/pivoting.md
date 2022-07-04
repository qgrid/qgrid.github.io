---
title: Pivoting
group: Features
order: 15
---
- [How to override pivot cell template?](#how-to-override-pivot-cell-template)

Pivot is a data summarization mode where users can break down raw data to highlight the desired information. It displays data in format such as spreadsheets or business intelligence applications.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
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
      this.gridModel.pivot({
         by: ['bondingType', 'groupBlock']
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/pivot-column-template/latest" %}

<a name="how-to-override-pivot-cell-template" href="#how-to-override-pivot-cell-template">
   How to override pivot cell template?
</a>

Use ng-template inside column component with type `pivot`.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep">
            <q-grid-column type="pivot">
               <ng-template for="body" let-$cell>
                  <div [style.color]="'#' + $cell.row.color">X</div>
               </ng-template>
            </q-grid-column>
         </q-grid-columns>
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
      this.gridModel.pivot({
         by: ['bondingType', 'groupBlock']
      });
   }
}
```