---
title: Sorting
group: Features
order: 6
---

Use q-grid sorting model to sort single and multiple data-bound columns.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

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
   @ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;
      
      model.sort({ 
         resetTrigger: [] 
      });
   }
}
```

## How to change default column sorting?

Each column has `compare` property that can be overridden to change sort algorithm.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid>
         <q-grid-columns>
            <q-grid-column key="myNumberColumn" 
                           [compare]="myCompare">
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

## How to allow to sort only by one column at the same time?

Set sort `mode` equals to `single`.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;
      
      model.sort({ 
         mode: 'single'
      });
   }
}
```