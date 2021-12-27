---
title: Pagination
group: Features
order: 4
---

- [How to set a page number?](#how-to-set-a-page-number)
- [How to reset pagination on sorting?](#how-to-reset-pagination-on-sorting)
- [Suggested Links](#suggested-links)

Use pagination model to view large data sets in small chunks for faster loading and navigation.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.pagination({
         size: 10;
         sizeList: [5, 10, 15];
      });
   }
}
```

<a name="how-to-set-a-page-number">
   How to set a page number?
</a>

Use `current` property of pagination model.

```typescript
const { pagination } = model;
pagination({
   current: 1
});
```

<a name="how-to-reset-pagination-on-sorting">
   How to reset pagination on sorting?
</a>

Use `resetTriggers` property of pagination model.

```typescript
const { pagination } = model;
pagination({
   resetTriggers: {
      ...pagination().resetTriggers,
      sort: ['by']
   }
});
```
<a name="suggested-links">
   Suggested Links
</a>

* [Pager plugin](/plugin/pager.html)
