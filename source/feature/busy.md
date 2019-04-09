---
title: Busy Indicator
group: Features
order: 16
---

The q-grid service provides access to control progress bar visibility.

```typescript
@Component({
      template: '<q-grid></q-grid>'
})
export class MyComponent {
      @ViewChild(GridComponent) myGrid: GridComponent;

      constructor(private dataService: DataService, private qgrid: Grid) {
      }

   onInit() {
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
```