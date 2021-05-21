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
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   gridModel: GridModel;

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService) {
         this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      const service = this.qgrid.service(this.gridModel);
      const cancelBusy = service.busy();

      this.dataService
         .getAtoms()
         .subscribe(rows => {
            cancelBusy();
            this.gridModel.data({ rows });
         });
      }
   }
}
```
