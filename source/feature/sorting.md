---
title: Sorting
group: Features
order: 6
---

- [How to prevent column order affect on sorting?](#how-to-prevent-column-order-affect-on-sorting)
- [How to change default column sorting?](#how-to-change-default-column-sorting)
- [How to allow to sort only by one column at the same time?](#how-to-allow-to-sort-only-by-one-column-at-the-same-time)

Use q-grid sorting model to sort single and multiple data-bound columns.

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
      this.gridModel.sort({
         by: ['+gender', '-name.last'],
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/sort-row-basic/latest" %}

<a name="how-to-prevent-column-order-affect-on-sorting">
   How to prevent column order affect on sorting?
</a>

By default sorting order depends on column order, to apply sequent order `trigger` array should be set to empty.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();

   constructor(private qgrid: Grid) {}

   ngAfterViewInit() {
      this.gridModel.sort({
         trigger: []
      });
   }
}
```
<a name="how-to-change-default-column-sorting">
   How to change default column sorting?
</a>

Each column has `compare` property that can be overridden to change sort algorithm.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid>
         <q-grid-columns>
            <q-grid-column key="myNumberColumn" [compare]="myCompare">
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   myCompare(a: number, b: number) {
      return a - b;
   }
}
```

<a name="how-to-allow-to-sort-only-by-one-column-at-the-same-time">
   How to allow to sort only by one column at the same time?
</a>


Set sort `mode` equals to `single`.

```typescript
gridModel.sort({
   mode: 'single'
});
```
