---
title: Pager
group: Plugins
order: 2
---
- [Installation](#installation)
- [Suggested Links](#suggestedlinks)

Use pager plugin to add possibilities to setup initial pagination option in component way.

{% docEditor "github/qgrid/ng2-example/tree/pagination-basic/latest" %}

<a name="installation" href="#installation">
   Installation
</a>

Add angular component inside of q-grid to change pagination settings through it.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-pager [size]="10" [sizeList]="[5, 10, 20]">
         </q-grid-pager>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
}
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Pagination](/feature/pagination.html)