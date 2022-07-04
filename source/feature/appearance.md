---
title: Appearance
group: Features
order: 8
---

- [How to apply styles to particular cell or row?](#how-to-apply-styles-to-particular-cell-or-row)
- [How to change column width?](#how-to-change-column-width)
- [How to make column width auto adjusted to the cell content?](#how-to-make-column-width-auto-adjusted-to-the-cell-content)
- [Suggested Links](#suggested-links)

Use rich css system to apply specific styles. Each cell, no mater if it is located in the header, body or footer has specific set of css class names.

* Class `q-grid-{column.type}` is selectable by using column type.
* Class `q-grid-the-{column.key}` is selectable by using column id.

<a name="how-to-apply-styles-to-particular-cell-or-row" href="#how-to-apply-styles-to-particular-cell-or-row">
   How to apply styles to particular cell or row?
</a>

Use style callbacks for dynamic class assignments, for the cell style it is possible to pass an object instead of callback in this case object keys will play the role of column key filters. Data rows style callbacks can accept `RowDetails` and `Node` classes depending on the q-grid settings.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async"
              [model]="gridModel">
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
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

   ngAfterViewInit() {
      this.gridModel.style({
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

> Pass unique id to `context.class` method for the appropriate group of styles.

{% docEditor "github/qgrid/ng2-example/tree/style-cell-basic/latest" %}


<a name="how-to-change-column-width" href="#how-to-change-column-width">
   How to change column width?
</a>

Use css styles or column `[width]` attribute to setup desired column size using pixels or percentages.

```html
<q-grid [rows]="rows$ | async">
   <q-grid-columns>
      <q-grid-column key="name" [width]="200"></q-grid-column>
      <q-grid-column key="description" width="100%"></q-grid-column>
   </q-grid-columns>
</q-grid>
```

> If percents are used all columns should define `width` property for the correct size calculation.

<a name="how-to-make-column-width-auto-adjusted-to-the-cell-content" href="#how-to-make-column-width-auto-adjusted-to-the-cell-content">
   How to make column width auto adjusted to the cell content?
</a>

As q-grid utilizes `table-layout: fixed` right now we doesn't support auto size out of box, but it can be calculated using TypeScript in user code and applying style API.

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Style API](/reference/style-api.html)
