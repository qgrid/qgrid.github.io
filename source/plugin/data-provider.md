---
title: Data Provider
group: Plugins
order: 2
---
- [Installation](#installation)
- [Strategies](#strategies)
- [Suggested Links](#suggestedlinks)

Use Data Provider plugin to get data from your endpoint step by step and process that information before put it inside Grid Model.

{% docEditor "github/qgrid/ng2-example/tree/pagination-basic/latest" %}

<a name="installation" href="#installation">
   # Installation
</a>

Add ` <q-grid-data-provider> ` component inside of q-grid to control rows and data requests through it.
`(requestRows)` emits every time when grid have to request any data from server. Grid rows should be passed through that provider.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid>
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-data-provider [rows]="page$ | async"
           (requestRows)="onRequestRows($event)">
         </q-grid-data-provider>
      </q-grid>
   `
})
export class MyComponent {
   page$: Observable<any[]>;

   constructor(dataService: MyDataService) { }

   onRequestRows(gridModel: GridModel): void {
   const pager = gridModel.pagination();

   this.page$ = this.dataService.getTotal()
      .pipe(
         tap(total => gridModel.pagination({ count: total })),
         switchMap(() => this.dataService.getPage(pager.current, pager.size)),
      );
	}
}
```

<a name="strategies" href="#strategies">
   ## Data Provider Strategies
</a>
For Data Provider you should apply any of default strategies to process your data or you could create your own strategy that implements `DataProviderStrategy` interface.
`DataProvider` class is used as proxy between your server API and grid data. It use proxy class `DataProviderPageServer` that has only two methods to get info from your endpoint.

Basic usage of Data Provider with strategies:

```typescript
@Component({
  selector: 'example-data-provider',
  template: `
   <q-grid [caption]="title" [model]="gridModel">
      <q-grid-columns generation="deep">
      </q-grid-columns>

      <q-grid-data-provider [rows]="page$ | async"
                     (requestRows)="onRequestRows($event)">
      </q-grid-data-provider>
   </q-grid>`
})
export class ExampleDataProviderComponent {
  page$: Observable<Atom[]>;
  gridModel = this.qgrid.model();

  private server = new FakeServer(this.dataService);
  private dataProvider: DataProvider<Atom> = new DataProvider<Atom>(this.gridModel, [
    new CheckNextPageCountStrategy(this.server),
    new RequestTotalCountOnceStategy(this.server),
    new CacheAlreadyRequestedPageStrategy(this.server),
    new ExampleReverseDataStrategy(),
  ]);

  constructor(
		private dataService: DataService,
		private qgrid: Grid,
	) { }

  onRequestRows(gridModel: GridModel): void {
		this.page$ = this.dataProvider.getPage();
	}
}

class FakeServer implements DataProviderPageServer<Atom> {
	constructor(
		private dataService: DataService,
	) { }

	getRecords(from: number, to: number): Observable<Atom[]> {
		return this.dataService.getAtoms()
			.pipe(map(atoms => atoms.slice(from, to)));
	}

	getTotal(): Observable<number> {
		return this.dataService.getAtoms()
			.pipe(map(atoms => atoms.length));
	}
}

class ExampleReverseDataStrategy<T> implements DataProviderStrategy<T> {
	process(memo: T[]): Observable<T[]> {
		return of(memo.slice().reverse());
	}
}
```
### Request Total Count Once Strategy
This is a default qgrid strategy that allow user to request total number of rows from server once and keep that value inside grid
```typescript
   new RequestTotalCountOnceStategy(this.server),
```

### Cache Already Requested Page Strategy
This is a default qgrid strategy that allow user to cache each requested page from server and keep these rows.
Also that strategy allows user to download any number of pages on background. To apply this just pass optional parameter
```typescript
   new CacheAlreadyRequestedPageStrategy(this.server, { pagestoLoad: 2 }),
```

### Check Next Page Count Strategy
This is a default qgrid strategy that allow user to check if server has records for next page and enable `next` button.
There's no need to apply this with `TotalCountOnceStrategy`.
```typescript
   new CheckNextPageCountStrategy(this.server),
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Pagination](/feature/pagination.html)