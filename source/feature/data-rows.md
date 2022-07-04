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
      <q-grid [rows]="rows$ | async"
              [model]="gridModel">
      </q-grid>
      `
})
export class MyComponent {
   rows$ = this.dataService.getRows();

   gridModel = this.qgrid
      .model();
      .columnList({ 
         generation: 'deep' 
      });

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }
}
```

<a name="what-will-happen-if-array-of-rows-is-not-consistent" href="#what-will-happen-if-array-of-rows-is-not-consistent">
What will happen if array of rows is not consistent? 
</a>

If some of the row fields are setup incorrectly - empty cells will be shown. 

> When edit such a value, an error will be thrown.

<a name="how-to-setup-rows-using-qgrid-model" href="#how-to-setup-rows-using-qgrid-model">
How to setup rows using q-grid model?
</a>

Almost all features and possibilities of the q-grid are accessible through the q-grid model, typically data comes from the observable so `rows$ | async` pattern looks elegant, when you already have an array of objects consider to put them to the model directly.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid
      .model()
      .data({
         rows: [
            { name: 'Alex', age: 16 }, 
            { name: 'Bill', age: 40 }
         ]
      })
      .columnList({ 
         generation: 'deep' 
      });

   constructor(private qgrid: Grid) {}
}
```

<a name="how-to-make-rows-frozen-or-pinned" href="#how-to-make-rows-frozen-or-pinned">
How to make rows frozen or pinned?
</a>

Use the q-grid `row` state to get control over the pinned rows.

> This is an experimental feature, for instance, navigation doesn't work for the frozen rows

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent {
   gridModel = this.qgrid.model();

   constructor(
      private dataService: DataService,
      private qgrid: Grid
   ) {
      // do not forget to unsubscribe sometimes :)
      this.dataService
         .getRows()
         .subscribe(rows => 
            this.gridModel
               .data({ rows });
               .row({
                  pinTop: [rows[0], rows[1]],
                  pinBottom: [rows[rows.length - 1]],
               })
         );
   }
}
```
<a name="how-to-enable-row-resizing-and-drag-&-drop" href="#how-to-enable-row-resizing-and-drag-&-drop">
How to enable row resizing and drag & drop?
</a>

By setting up `canMove` and `canResize` inputs in the `q-grid-row` component or by using `row` state in the q-grid model.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid
      .model()
      .row({
         canResize: true,
         canMove: true,
      });

   constructor(private qgrid: Grid) {}
}
```

{% docEditor "github/qgrid/ng2-example/tree/drag-row-basic/latest" %}
