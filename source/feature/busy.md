---
title: Busy Indicator
group: Features
order: 10
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
   @ViewChild(GridComponent) myGrid: GridComponent;   

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService) {
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;
      const service = this.qgrid.service(model);

      const cancelBusy = service.busy();
      this.dataService
         .getAtoms()
         .subscribe(rows => {
            cancelBusy();
            model.data({ rows });
         });
      }
   }
}
```