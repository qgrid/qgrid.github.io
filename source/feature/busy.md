---
title: Busy Indicator
group: Features
order: 16
---

To control progress bar visibility busy method from the q-grid service can be used.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>'
})
export class MyComponent {
   gridModel = this.qgrid
      .model()
      .columnList({
         generation: 'deep'
      });

   constructor(
      private qgrid: Grid,
      dataService: MyDataService
   ) {
      const service = this.qgrid.service(this.gridModel);
      const cancelBusy = service.busy();

      dataService
         .getAtoms()
         .subscribe(rows => {
            cancelBusy();
            this.gridModel.data({ rows });
         });
   }
}
```
