---
title: Data Rows
group: Features
order: 1
---

There are a few ways to fill your grid by data rows. Commonly you want to get data from service and pass it to the grid.

## Observable<object[]>

Directly bind your observable data set from service to template attribute.

```typescript
import { Grid } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="myRows | async">
            <q-grid-columns generation="deep">
            </q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   myRows: MyDataRow[];

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.myRows = dataService.getRows();
   }
}
```

## Model

Get data rows from service and update appropriate property of data grid model in your Angular component.

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

## Pipe

Add data getting logic to begin of grid pipeline - a series of methods that grid invokes asynchronously anytime refresh is required. Every pipe in the series gets data from previous one, handles it and passes to the next pipe. Modify pipeline and update pipe property of data grid model. Also you can use predefined sets of typical operations called [pipe units](#pipe-units).

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
		this.myModel.data({
			pipe: [
				this.getData().bind(this),
				...qgrid.pipeUnit.default
			]
		});
	}
	
	getData(data, ctx, next) {
		return dataService
			.getRows()
			.subscribe(rows => next(rows));
	}
}
```

## <a name="pipe-units"></a>Pipe units

* default pipe unit contains all methods responding to data processing by the grid model (filter, sort, pagination, group, pivot). There is assumption that you pass to the grid whole data set and in this case filtering, sorting and pagination will work well from the box on the client side. Other methods is intended to define how your data will be rendered.

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

* view pipe unit is intended to case when you get ready data from server side (filtered, sorted, paginated, etc). Then grid will only render data how it was passed.

```typescript
qgrid.pipeUnit.view = [
	qgrid.pipe.data,
	qgrid.pipe.memo,
	qgrid.pipe.column,
	qgrid.pipe.view
];
```
