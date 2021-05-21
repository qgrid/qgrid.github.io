---
title: Visibility
group: Features
order: 17
---

Use `visibility` model to show or hide areas of the q-grid.

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
   rows$: Observable<[]>;
   gridModel: GridModel;

   constructor(dataService: MyDataService, qgrid: Grid) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      this.gridModel.visibility({
         head: true,
         foot: true,
         body: true,
         toolbar: {
            top: true,
            bottom: true,
            right: false,
            left: false
         }
      });
   }
}
```
