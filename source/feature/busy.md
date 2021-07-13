---
title: Busy Indicator
group: Features
order: 16
---

Use q-grid service to get control over progress bar visibility.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [model]="gridModel">
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
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
}
```
