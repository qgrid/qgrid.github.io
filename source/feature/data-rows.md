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
   rows$ = this.dataService.getRows();

   constructor(private dataService: MyDataService) {}
}
```

<a name="what-will-happen-if-array-of-rows-is-not-consistent" href="#what-will-happen-if-array-of-rows-is-not-consistent">
What will happen if array of rows is not consistent? 
</a>

If some of row properties are not accessible empty cells will be shown, on edit error will be thrown.

<a name="how-to-setup-rows-using-qgrid-model" href="#how-to-setup-rows-using-qgrid-model">
How to setup rows using q-grid model?
</a>

The preferred way to obtain q-grid model is to use `GridModel` and assign it in template.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [rows]="rows$ | async" [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();
   rows$ = this.dataService.getRows();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.columnList({
         generation: 'deep',
      });
      this.rows$.subscribe((rows) => this.gridModel.data({ rows }));
   }
}
```
<a name="how-to-make-rows-frozen-or-pinned" href="#how-to-make-rows-frozen-or-pinned">
How to make rows frozen or pinned?
</a>

Use `row` state in the q-grid model to control which rows to pin.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();

   constructor(
      private dataService: DataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.dataService.getRows().subscribe((rows) => {
         this.gridModel.data({ rows });
         this.gridModel.row({
            pinTop: [rows[0], rows[1]],
            pinBottom: [rows[rows.length - 1]],
         });
      });
   }
}
```
<a name="how-to-enable-row-resizing-and-drag-&-drop" href="#how-to-enable-row-resizing-and-drag-&-drop">
How to enable row resizing and drag & drop?
</a>

By setting up `canMove` and `canResize` inputs in the `q-grid-row` component or by using `row` state in the q-grid model.

```html
<q-grid>
   <q-grid-row [canMove]="true" [canResize]="true">
   </q-grid-row>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/drag-row-basic/latest" %}
