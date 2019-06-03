---
title: Filtering
group: Features
order: 4
---

Use q-grid model to setup row filter options.

## How to add default filter on component load?

Use `by` property to get or set filter settings. 

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

      gridModel.filter({
         by: {
            showAllSmithsColumnKey: { items: ['Smith'] },
            showEmptyRowsColumnKey: { blanks: true },
            showSmithAndBranColumnKey: { 
               expression: {
                  kind: 'group',
                  op: 'and',
                  left: {
                     kind: 'condition',
                     left: key,
                     op: 'in',
                     right: ['Smith', 'Bran']
                  },
                  right: null
               }
            }
         }
      });   
   }
}
```

## How to add a filter row?

To show filter controls under the column headers use `filterUnit` attribute, filter view can be overridden in the template definition.

```typescript
@Component({
   template: `
      <q-grid>
         <q-grid-column key="myNumber">
            <ng-template for="filter" let-$cell>
               <input #input
                     type="number"
                     (change)="$view.filter.column.execute($cell.column.model, input.value)" />
            </ng-template>
         </q-grid-column>
      </q-grid>
   `
})
export class ExampleFilterRowCustomComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.filter({
         unit: 'row'
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/filter-row-basic/latest" %}

## How to propagate list of items to the column filter from the server?

When server side pagination is used the data in q-grid can be not loaded fully in this case `fetch` callback can be used to get list of items to show in column filter component.

```typescript
import { GridComponent, FetchContext } from 'ng2-qgrid';

@Component({
   template: `
      <q-grid [rows]="rows$ | async">
            <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class ExampleFilterRowCustomComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.filter({
         fetch: (key: string, context: FetchContext) => {
            const { search, take, skip } = context;
            return dataService.getFilterItemsFor(key, search, take, skip);
         }
      });
   }
}
```

## How to disable particular column filter?

Each column has `canFilter` property that could be used as indicator if filter is applicable or not.

```html
<q-grid>
   <q-grid-column key="noFilter" [canFilter]="false"></q-grid-column>
</q-grid>
```

## How to filter q-grid externally?

Setup `match` predicate to execute custom filtration on loaded data.

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
   @Input() value: string;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.filter({
         match: () => row => row.name.toLowerCase().indexOf(this.value) >= 0
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/filter-row-custom/latest" %}

## Suggested Links

* [Data manipulation plugin](/plugin/data-manipulation.html)