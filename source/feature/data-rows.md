---
title: Data Rows
group: Features
order: 0
---

- [What will happen if array of rows is not consistent?](#what-will-happen-if-array-of-rows-is-not-consistent)

- [How to make rows frozen or pinned?](#how-to-make-rows-frozen-or-pinned)

- [How to setup rows using q-grid model?](#how-to-setup-rows-using-qgrid-model)

- [How to enable row resizing and drag & drop?](#how-to-enable-row-resizing-and-drag-&-drop)

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
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
}
```

<a name="what-will-happen-if-array-of-rows-is-not-consistent">
## What will happen if array of rows is not consistent? 
</a>

If some of row properties are not accessible empty cells will be shown, on edit error will be thrown.

<a name="how-to-setup-rows-using-qgrid-model">
## How to setup rows using q-grid model?
</a>

The preferred way to obtain q-grid model is to use `GridComponent` that will be available only after `ngAfterViewInit` hook being triggered.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;

   constructor(dataService: MyDataService) {}

   ngAfterViewInit() {
      const { model } = this.myGrid;
      
      dataService
         .getRows()
         .subscribe(rows => model.data({ rows }));
   }
}
```
<a name="how-to-make-rows-frozen-or-pinned">
## How to make rows frozen or pinned?
</a>

Use `row` state in the q-grid model to control which rows to pin.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   

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
<a name="how-to-enable-row-resizing-and-drag-&-drop">
## How to enable row resizing and drag & drop?
</a>

By setting up `canMove` and `canResize` inputs in the `q-grid-row` component or by using `row` state in the q-grid model.

```html
<q-grid>
   <q-grid-row [canMove]="true" [canResize]="true">
   </q-grid-row>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/drag-row-basic/latest" %}