---
title: Pivoting
group: Features
order: 12
---

Pivot is a data summarization mode where users can break down raw data to highlight the desired information. It displays data in format such as spreadsheets or business intelligence applications.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.pivot({ 
         by: ['bondingType', 'groupBlock']
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/pivot-column-template/latest" %}

## How to override pivot cell template?

Use ng-template inside column component with type `pivot`.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
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
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.pivot({ 
         by: ['bondingType', 'groupBlock']
      });
   }
}
```