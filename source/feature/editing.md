---
title: Editing
group: Features
order: 8
---

There are situations when the end user need to edit data.

## Setup

## Edit Cell

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-basic/latest" %}

## Edit Row

{% docEditor "github/qgrid/ng2-example/tree/edit-row-basic/latest" %}

## Data Manipulation

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
   <q-grid [model]="myModel">
      <q-grid-columns generation="deep">
         <q-grid-column key="rowIndicator" type="row-indicator"></q-grid-column>
         <q-grid-column key="rowOptions" type="row-options"></q-grid-column>
	</q-grid-columns>

	<q-grid-data-manipulation [rowFactory]="myRowFactory">
	</q-grid-data-manipulation>

   </q-grid>`
})
export class MyComponent {
   myModel: GridModel;

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.myModel = qgrid.model();
      dataService
         .getPeople()
         .subscribe(rows => this.myModel.data({ rows }));
   }

   myRowFactory() {
       return new Human();
   }

   submit() {
       const { added, edited, deleted } = myModel.dataManipulation();
       
       dataService
          .addPeople(added)
          .editPeople(edited)
          .deletePeople(deleted);
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/manipulate-data-basic/latest" %}

## Validation

{% docEditor "github/qgrid/ng2-example/tree/validation-basic/latest" %}

## Suggested links

* [LIVR]()