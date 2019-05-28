---
title: Data Manipulation
group: Plugins
order: 1
---

Use Data Manipulation plugin to extend the q-grid with additional edit options. Please note that options and indicator column are not required to be present in the particular q-grid.

* Add new rows through the action bar.
* Delete rows using `row options` column.
* Cell and row color coding.
* If `row indicator` column exists it will be used to show row status.
* Access to the touched entities through the `dataManipulation` model.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
   <q-grid [model]="gridModel">
      <q-grid-columns generation="deep">
         <q-grid-column key="rowIndicator" type="row-indicator"></q-grid-column>
         <q-grid-column key="rowOptions" type="row-options"></q-grid-column>
    </q-grid-columns>

    <q-grid-data-manipulation [rowFactory]="myRowFactory">
    </q-grid-data-manipulation>

   </q-grid>`
})
export class MyComponent {
   gridModel: GridModel;

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.gridModel = qgrid.model();
      dataService
         .getPeople()
         .subscribe(rows => this.gridModel.data({ rows }));
   }

   myRowFactory() {
       return new Human();
   }

   submit() {
       const { added, edited, deleted } = gridModel.dataManipulation();

       dataService
          .addPeople(added)
          .editPeople(edited)
          .deletePeople(deleted);
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/manipulate-data-basic/latest" %}