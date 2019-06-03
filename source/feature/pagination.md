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
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.pagination({
         unit: 'row',
         mode: 'multiple',
         area: 'body'            
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/pagination-basic/latest" %}