---
title: Sorting
group: Features
order: 4
---

Use q-grid sorting model to sort single and multiple data-bound columns.

## How to setup default sort direction?

Use `+` and `-` symbols to identify the direction of sorting.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;
      model.sort({ 
         by: ['+gender', '-name.last']
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/sort-row-basic/latest" %}

## How to prevent column order affect on sorting?

By default sorting order depends on column order, to apply sequent order `resetTrigger` array should be set to empty.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;
      model.sort({ 
         resetTrigger: [] 
      });
   }
}
```
