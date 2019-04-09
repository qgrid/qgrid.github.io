---
title: Row Tricks
group: Features
order: 16
---

## Drag & Drop

Row drag and drop configuration is setting up through `q-grid-row` component.

```html
<q-grid>
   <q-grid-row [canMove]="true"></q-grid-row>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/drag-row-basic/latest" %}

## Resizing

Row resizing configuration is setting up through `q-grid-row` component.

```html
<q-grid>
   <q-grid-row [canResize]="true"></q-grid-row>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/size-row-basic/latest" %}

## Frozen Rows

Use `row` model to pin rows to top or bottom.

```typescript
@Component({
   template: '<q-grid></q-grid>'
})
export class MyComponent {
   gridModel: GridModel;

   constructor(dataService: DataService, qgrid: Grid) {
      this.gridModel = qgrid.model();

      dataService
         .getRows()
         .subscribe(rows => {
            this.gridModel.data({ rows });
            this.gridModel.row({
               pinTop: [rows[0], rows[1]],
               pinBottom: [rows[rows.length - 1]]
            });
         });
      }
}
```

{% docEditor "github/qgrid/ng2-example/tree/floating-rows-basic/latest" %}