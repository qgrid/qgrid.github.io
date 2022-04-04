---
title: Data Provider
group: Plugins
order: 2
---
- [Installation](#installation)
- [Suggested Links](#suggestedlinks)

Use Data Provider plugin to get data from your endpoint step by step and process that information before put it inside Grid Model.

{% docEditor "github/qgrid/ng2-example/tree/pagination-basic/latest" %}

<a name="installation" href="#installation">
   Installation
</a>

Add `<q-grid-data-provider>` component inside of q-grid to control rows and data requests through it.
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

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Pagination](/feature/pagination.html)