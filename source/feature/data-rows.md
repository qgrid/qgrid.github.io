---
title: Data Rows
group: Features
order: 0
---

Any array of objects can be directly bind to the q-grid `rows` attribute, if `observable` is used don't forget to add `async` pipe.

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