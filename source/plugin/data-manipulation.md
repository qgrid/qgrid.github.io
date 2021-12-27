---
title: Data Manipulation
group: Plugins
order: 1
---
- [Installation](#installation)

Use data manipulation plugin to extend the q-grid with additional edit options. 

{% docEditor "github/qgrid/ng2-example/tree/manipulate-data-basic/latest" %}

<a name="#installation">
   Installation
</a>

Add angular component inside of q-grid component. If `row indicator` column exists it will be used to show row status, `row options` column is an entry point to delete rows.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
            <q-grid-column key="rowIndicator" type="row-indicator"></q-grid-column>
            <q-grid-column key="rowOptions" type="row-options"></q-grid-column>
         </q-grid-columns>

         <q-grid-data-manipulation [rowFactory]="humanFactory">
         </q-grid-data-manipulation>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<Human[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getHumans();
   }

   humanFactory() {
      return new Human();
   }

   submit() {
      const { added, edited, deleted } = gridModel.dataManipulation();

      dataService
         .addPeople(added)
         .editPeople(edited)
         .deletePeople(deleted)
         .save();
   }
}
```