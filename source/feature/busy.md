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
      <q-grid>
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   constructor(
      private qgrid: Grid,
      private dataService: MyDataService) {
   }

   ngAfterViewInit() {
      const gridModel = qgrid.model();
      const service = this.qgrid.service(gridModel);

      const cancelBusy = service.busy();
      this.dataService
         .getAtoms()
         .subscribe(rows => {
            cancelBusy();
            gridModel.data({ rows });
         });
      }
   }
}
```
