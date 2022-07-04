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
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
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
