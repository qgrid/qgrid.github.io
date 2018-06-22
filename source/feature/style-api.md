---
title: Style API
group: Features
order: 5
---

There are two ways to apply styles to q-grid rows and cells. It can be useful when there is need to change styles dynamically or depending on data context.

## The component method

To apply styles to the q-grid define component class method and bind it in the template.

```typescript
import { StyleCellContext, Column } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [styleCell]="styleCell"
              [styleRow]="styleRow">
         <q-grid-columns generation="deep">
         </q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   styleCell(row: any, column: Column, context: StyleCellContext) {
      if (column.key === 'name') {
         context.class(`td-${row.name}`, {
            'color': `#${row.color}`,
            'background': '#3f51b5'
         });
      }
   }

   styleRow(row: any, context: StyleRowContext) {
      if (!row.isActive) {
         context.class('inactive', { 'opacity': '0.5' });
      }
	}
}
```

{% docEditor "github/qgrid/ng2-example/tree/style-cell-basic/latest" %}

{% docEditor "github/qgrid/ng2-example/tree/style-row-basic/latest" %}

## The Grid Model

Use `Grid` service to create q-grid model and fill in `style` with cell and row style methods.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="myModel"></q-grid>'
})
export class MyComponent {
   myModel: GridModel;

   constructor(qgrid: Grid) {
      this.myModel = qgrid.model();
      this.myModel.style({
         cell: (row: any, column: Column, context: StyleCellContext) => {
            if (column.key === 'name') {
               context.class(`td-${row.name}`, {
                  'color': `#${row.color}`,
                  'background': '#3f51b5'
               });
            }
         },
         row: (row: any, context: StyleRowContext) => {
            if (!row.isActive) {
               context.class('inactive', { 'opacity': '0.5' });
            }
         }
      });
   }
}
```

## How it works

The q-grid updates styles for cells and rows on each change detection cycle. It creates internal stylesheets and set appropriate classes to td/tr elements. Class naming allows to avoid using of inline styles and make layout recalculation faster.

<img src="assets/style-api-html.png" type="image/png" />