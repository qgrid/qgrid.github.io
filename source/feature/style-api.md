---
title: Style API
group: Features
order: 6
---

Use q-grid rich css class naming system to apply specific styles. For the dynamic styles `style` state could be used, 

## CSS

Each cell, no mater if it is located in the header, body or footer has specific set of css class names.

* `q-grid-{column.type}` class name for css selectors which use column types.
* `q-grid-the-{column.key}` class name for css selectors which use column identifiers. Note that `the` article is used to exclude ambiguous names.

## Style Model

Use style callbacks for dynamic class assignments. For the cell style it is possible to pass an object instead of callback. In this case, object keys will play the role of column key filters. Besides the data rows style callbacks can accept `RowDetails` and `Node` classes depending on the q-grid settings. Be careful when use style API in a complicated cases. 


> Note that first argument of `context.class` method should be an unique identifier for the appropriate group of styles.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent {
   ViewChild(GridComponent) myGrid: GridComponent;

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

{% docEditor "github/qgrid/ng2-example/tree/style-cell-basic/latest" %}

## How style model works

Every change detection cycle the q-grid traverses through all visible rows and cells to invoke user defined style callbacks. Later when callback series is finished style API will produce dynamic stylesheet using pair of context identifier and column key as a css class name. This technique avoids to use inline styles and makes style management easier. Resizing of rows and columns behaves the same way. 

## The Picture

Next picture can be found if open element inspector and follow the style section.

<img src="assets/style-api-html.png" type="image/png" />

## Column Width

Use column width attribute to setup desired column size using pixels or percentages.

{% docEditor "github/qgrid/ng2-example/tree/size-column-basic/latest" %}

> Right now percents are materialized only once on view init, depending on the origin q-grid width.

## How to make column width auto adjusted to the cell content?

As q-grid utilizes `table-layout: fixed` right now we doesn't support auto size out of box, but it can be calculated using TypeScript in user code.