---
title: Grid Service
group: Reference
order: 2
---

Another way to get access to the q-grid model is to use `Grid` service, create a new model and add binding in the template.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>'
})
export class MyComponent {
   gridModel: GridModel;

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.gridModel = qgrid.model();
      dataService
            .getRows()
            .subscribe(rows => this.gridModel.data({ rows }));
   }
}
```
