---
title: Mouse API
group: Reference
order: 10
---

Use mouse API to handle user clicks and other mouse events inside the q-grid component.

```typescript
@Component({
   template: ` <q-grid [rows]="rows$ | async" [model]="gridModel"></q-grid> `,
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.mouseChanged.on((e) => {
         const { code, status, target } = e.state;
         if (code === 'left' && status === 'up') {
            console.log(target);
         }
      });
   }
}
```
