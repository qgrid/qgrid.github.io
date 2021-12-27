---
title: Grid Facade
group: Reference
order: 2
---
- [Create utility service](#create-utility-service)
- [Create q-grid model in the code](#create-q-grid-model-in-the-code)

`Grid` facade contains a set of entry points for more advance using of q-grid.

<a name="#create-utility-service">
   Create utility service
</a>

`Grid` facade can create an utility service over q-grid model. It could help to control grid focus, progress etc.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>'
})
export class MyComponent {
   gridModel: GridModel;

   constructor(qgrid: Grid) {
      this.gridModel = qgrid.model();

      const service = qgrid.service(this.gridModel);
      // Set focus to the second row
      service.focus(1);
   }
}
```

<a name="#create-q-grid-model-in-the-code">
   Create q-grid model in the code
</a>

`Grid` service is another way to get access to the q-grid model  create a new model and add binding to the template.

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