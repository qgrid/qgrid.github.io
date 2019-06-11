---
title: Data Middleware
group: Reference
order: 3
---

The q-grid pipe is a series of methods that grid invokes asynchronously anytime refresh is required. Every pipe in the series gets data from previous one, handles it and passes to the next one. This basic concept allows to modify how data rows are processed to display the data. Here is the default pipeline.

```typescript
import { PipeContext } from 'ng2-qgrid';

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

## Default Pipeline

By default the chain below is invoked element by element when data middleware is triggered.

```typescript
model.data({
   pipe : [
      qgrid.pipe.data,
      qgrid.pipe.filter,
      qgrid.pipe.sort,
      qgrid.pipe.memo,
      qgrid.pipe.group, 
      qgrid.pipe.pivot,
      qgrid.pipe.column,
      qgrid.pipe.pagination,
      qgrid.pipe.view
]});
```

## Data Pipe

The intent is to fill data `rows` property and setup initial set of data `columns` with or without auto generation to use them in the next pipes.

## Filter Pipe

Applies client side filtration, utilizes `filter` model for getting input data and `expression builder` kit to support complex logic by invoking `match` function from filter state.

## Sort Pipe

Applies client side sorting, supports sorting by multiple columns.

## Memo pipe

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

## Group Pipe

The intent is to build nodes from the raw data rows and fill in memo nodes section if group model has some input.

## Pivot Pipe

The intent is to build `pivot` data from the raw data rows and fill in memo pivot section if pivot model has some input.

## Column Pipe

Responsible for support: adding `control` type columns, like select or group columns, column cohorts (rowSpans and colSpans inside header), pivot column generation, column visibility and sorting. To the memo output `columns` property is added.

## Pagination Pipe

Applies pagination if scroll mode is not `virtual`.

## View Pipe

The intent is to order rows appropriate to the `row list` model(row drag & drop support) and fill in the `scene` model that is used to render cells.

## Pipe Units

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

## The Scene

A class that contains the q-grid pipe results, actually `qgrid.pipe.view` pipe fills the scene, further the q-grid renderer outputs rows and columns using the scene model. Another attribute of the scene is `status`, it's used by internal routines to manage the q-grid readiness.