---
title: Data Rows
group: Features
order: 1
---

There are a few ways to fill in the q-grid with data rows.

## Array<{}>

Any array of objects can be directly bind to the q-grid `rows` attribute. If `observables` are used don't forget to add `async` pipe. Note that if an array of primitive types is used the q-grid won't be able to process it.

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
   myRows: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.myRows = dataService.getRows();
   }
}
```

## The Grid Model

Use `Grid` service to create q-grid model and fill in `data` with rows.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="myModel"></q-grid>'
})
export class MyComponent {
   myModel: GridModel;

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.myModel = qgrid.model();
      dataService
         .getRows()
         .subscribe(rows => this.myModel.data({ rows }));
   }
}
```

## The Grid Component

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

## The Pipe

The q-grid pipe is a series of methods that grid invokes asynchronously anytime refresh is required. Every pipe in the series gets data from previous one, handles it and passes to the next one. Use `data pipe` property to modify the default pipeline.

```typescript
import { PipeContext, PipeMemo } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [pipe]="myPipe"></q-grid>'
})
export class MyComponent {
   myPipe: Array<(memo: any, context: PipeContext, next: (memo: any) => void)>;

   constructor(qgrid: Grid, dataService: MyDataService) {
      // Anytime refresh is required(e.g. on sort or filter) dataServicePipe will be called.
      const dataServicePipe = 
         (rows, context, next) =>
            dataService.getRows().subscribe(rows => next(rows));

      this.myPipe = [dataServicePipe, ...qgrid.pipeUnit.default];
}
```

Here are set of internal q-grid pipes:

* `qgrid.pipe.data` 
The intent is to fill data `rows` property and setup initial set of data `columns` to use them in the next pipes. Without filling data columns, next pipes in the default pipeline won't work, because they need to be aware of how to get column cell values from data source.  

* `qgrid.pipe.filter` 
Applies client side filtration, utilizes `filter` model for getting input data and `expression builder` kit to support complex logic.

* `qgrid.pipe.sort` 
Applies client side sorting, supports sorting by multiple columns.

* `qgrid.pipe.memo` 
Converts input of data rows to output that supports grouping and pivoting. 

```javascript
function memoPipe(rows, context, next) {
   next({
      rows,
      pivot: { heads: [], rows: [] },
      nodes: []
   });
}
```

* `qgrid.pipe.group` 
The intent is to build nodes from the raw data rows and fill in memo nodes section if group model has some input.

* `qgrid.pipe.pivot` 
The intent is to build `pivot` data from the raw data rows and fill in memo pivot section if pivot model has some input.

* `qgrid.pipe.column`
Responsible for support: adding `control` type columns, like select or group columns, column cohorts (rowSpans and colSpans inside header), pivot column generation, column visibility and sorting. To the memo output `columns` property is added.

* `qgrid.pipe.pagination`
Applies pagination if scroll mode is not `virtual`.

* `qgrid.pipe.view`
The intent is to order rows appropriate to the `row list` model(row drag & drop support) and fill in the `scene` model that is used to render cells.

## Pipe units

Predefined sets of typical pipe series called pipe units are used to change the q-grid data processing behavior. Here are some examples:

* `Default` pipe unit contains set of methods responding for the client side data processing.

```typescript
qgrid.pipeUnit.default = [
      qgrid.pipe.data,
      qgrid.pipe.filter,
      qgrid.pipe.sort,
      qgrid.pipe.memo,
      qgrid.pipe.group,
      qgrid.pipe.pivot,
      qgrid.pipe.column,
      qgrid.pipe.pagination,
      qgrid.pipe.view
];
```

* `View` pipe unit is intended to case when you process actions like sorting, filtering and pagination on server side and need just to show rows and columns in the q-grid.

```typescript
qgrid.pipeUnit.view = [
      qgrid.pipe.data,
      qgrid.pipe.memo,
      qgrid.pipe.column,
      qgrid.pipe.view
];
```
