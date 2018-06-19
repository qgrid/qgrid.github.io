---
title: Architecture
type: guide
group: Getting started
order: 3
---

## More control

if you need to have full control over the qgrid model, just add `Grid` service to the component.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   templateUrl: './my.component.html'
})
export class MyComponent {
   gridModel: GridModel;

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.gridModel = gridService.model();
      dataService
            .getRows()
            .subscribe(rows => this.gridModel.data({ rows }));
   }
}
```

Add bind the model to the q-grid component.

```html
<q-grid [model]="gridModel">
</q-grid>
```