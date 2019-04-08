---
title: Data Rows
group: Features
order: 2
---

There are a few ways to fill in the q-grid with data rows.

## [Rows] Input

Any array of objects can be directly bind to the q-grid `rows` attribute. If `observables` are used don't forget to add `async` pipe.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="myRows | async">
            <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   myRows: Observable<MyRow[]>;

   constructor(dataService: MyDataService) {
      this.myRows = dataService.getRows();
   }
}
```

> Note that only object as item type is supported, if an array of primitive types is used the q-grid won't be able to process it.

## The Grid Model

Use `GridComponent` selector for accessing the q-grid model. Note that grid component instance will be available only after view init.

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