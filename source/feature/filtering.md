---
title: Filtering
group: Features
order: 5
---

- [How to add default filter on component load?](#how-to-add-default-filter-on-component-load)
- [How to add a filter row?](#how-to-add-a-filter-row)
- [How to propagate list of filter by items to the column filter from the server?](#how-to-propagate-list-of-filter-by-items-to-the-column-filter-from-the-server)
- [How to disable particular column filter?](#how-to-disable-particular-column-filter)
- [How to filter q-grid externally?](#how-to-filter-q-grid-externally)

There are many UI abilities that q-grid provides to filter data. Choose column filters, filter row, condition builder or implement custom filters.

<a name="how-to-add-default-filter-on-component-load" href="#how-to-add-default-filter-on-component-load">
   How to add default filter on component load?
</a>

Use `by` property to get or set filter settings.

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
      this.gridModel.filter({
         by: {
            firstName: { items: ['Smith'] },
            gender: { blanks: true },
            $expression: {
               kind: 'group',
               op: 'and',
               left: {
                  kind: 'condition',
                  left: 'firstName',
                  op: 'in',
                     right: ['Smith', 'Bran']
               },
               right: null
            }
         }
      });
   }
}
```

<a name="how-to-add-a-filter-row" href="#how-to-add-a-filter-row">
   How to add a filter row?
</a>

To show filter controls under the column headers use `filterUnit` attribute, filter view can be overridden in the template definition.

```typescript
@Component({
   template: `
      <q-grid [model]="gridModel">
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
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.filter({
         unit: 'row'
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/filter-row-basic/latest" %}

<a name="how-to-propagate-list-of-filter-by-items-to-the-column-filter-from-the-server" href="#how-to-propagate-list-of-filter-by-items-to-the-column-filter-from-the-server">
   How to propagate list of filter by items to the column filter from the server?
</a>

When server side pagination is used the data in q-grid can be not loaded fully in this case `fetch` callback can be used to get list of items to show in column filter component.

```typescript
import { Grid, GridModel, FetchContext } from 'ng2-qgrid';

@Component({
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class ExampleFilterRowCustomComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.filter({
         fetch: (key: string, context: FetchContext) => {
            const { search, take, skip } = context;
            return dataService.getFilterItemsFor(key, search, take, skip);
         }
      });
   }
}
```

<a name="how-to-disable-particular-column-filter" href="#how-to-disable-particular-column-filter">
   How to disable particular column filter?
</a>

Each column has `canFilter` property that could be used as indicator if filter is applicable or not.

```html
<q-grid>
   <q-grid-column key="noFilter" [canFilter]="false"></q-grid-column>
</q-grid>
```

<a name="how-to-filter-q-grid-externally" href="#how-to-filter-q-grid-externally">
   How to filter q-grid externally?
</a>

Setup `custom` predicate to execute custom filtration. If filtering is required after the user input, just setup another instance of `custom` function.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   @Input() value: string;

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.filter({
         custom: (row) => row.name.toLowerCase().indexOf(this.value) >= 0,
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/filter-row-custom/latest" %}
