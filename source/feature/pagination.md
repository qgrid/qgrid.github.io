---
title: Pagination
group: Features
order: 4
---

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

## How to set a page number?

Use `current` property of pagination model.

```typescript
const { pagination } = model;
pagination({
   current: 1
});
```

## How to reset pagination on sorting?

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

## Suggested Links

* [Pager plugin](/plugin/pager.html)
