---
title: Appearance
group: Features
order: 8
---

Use rich css system to apply specific styles. Each cell, no mater if it is located in the header, body or footer has specific set of css class names.

* Class `q-grid-{column.type}` is selectable by using column type.
* Class `q-grid-the-{column.key}` is selectable by using column id.

## How to apply styles to particular cell or row?

Use style callbacks for dynamic class assignments, for the cell style it is possible to pass an object instead of callback in this case object keys will play the role of column key filters. Data rows style callbacks can accept `RowDetails` and `Node` classes depending on the q-grid settings.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.style({
         cell: {
            'myColumnKey': (row, column, context) => {
               context.class(`td-${row.name}`, {
                  color: `#${row.color}`,
                  background: '#3f51b5'
               });
            }
         },
         row: (row, context) => {
            if (!row.isActive) {
               context.class('inactive');
            }
         }
      });
   }
}
```

> Note that first argument of `context.class` method should be an unique identifier for the appropriate group of styles.

{% docEditor "github/qgrid/ng2-example/tree/style-cell-basic/latest" %}

## Column Width

Use column width attribute to setup desired column size using pixels or percentages.

## How to make column width auto adjusted to the cell content?

As q-grid utilizes `table-layout: fixed` right now we doesn't support auto size out of box, but it can be calculated using TypeScript in user code and applying style API.

## Suggested Links

* [Style API](/reference/style-api.html)