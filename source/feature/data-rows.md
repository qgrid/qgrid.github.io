---
title: Data Rows
group: Features
order: 0
---

Any array of objects can be directly bind to the q-grid, if `observable` is used just add `async` pipe.

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
   rows$: Observable<MyRow[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
}
```

> Only array of objects is supported, if primitive types are used the q-grid won't be able to process it.

## How to setup rows using q-grid model?

The preferred way is to use `GridComponent`, note that component will be available only after `ngAfterViewInit` hook being passed.

```typescript
import { GridComponent } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;

   constructor(dataService: MyDataService) {}

   ngAfterViewInit() {
      const { model } = this.myGrid;
      dataService
         .getRows()
         .subscribe(rows => model.data({ rows }));
   }
}
```

## How to make rows frozen?

Use `row` model to make rows frozen.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;

      this.dataService
         .getRows()
         .subscribe(rows => {
            model.data({ rows });
            model.row({
               pinTop: [rows[0], rows[1]],
               pinBottom: [rows[rows.length - 1]]
            });
         });
   }
}
```

## How to enable row drag & drop and resizing?

Use `q-grid-row` component.

```html
<q-grid>
   <q-grid-row [canMove]="true" [canResize]="true">
   </q-grid-row>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/drag-row-basic/latest" %}