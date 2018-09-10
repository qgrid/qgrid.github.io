---
title: Editing
group: Features
order: 8
---

There are situations when the end user need to edit data, in this case the q-grid provides a lot of possibilities.

## Edit Cell

Setup edit mode equals to `cell` to turn on editing. Use `canEdit` column attribute to disable editing of particular columns.

```html
<q-grid editMode="cell">
   <q-grid-column key="birth" canEdit="false"></q-grid-column>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-basic/latest" %}

## Edit Model

Edit model could give extended control over data edit, to access these possibilities use `model.edit()` type.

```typescript
const { commit, commitShortcuts, state } = myGridModel.edit();
```

## Edit State

Indicates the current q-grid status in term of data manipulation.

* `view` means that q-grid now is in the data browsing mode.
* `edit` indicates that q-grid editor is opened.
* `startBatch` and `endBatch` show status of the batch edit.

## Edit commands & shortcuts

Use commands to have a global control over q-grid editing. Use shortcuts that have `{columnType: [keyboardKey]}` type to setup editing shortcuts.

```javascript
gridModel.edit({
   enter: { 
      canExecute: e => e.column.class === 'data' 
   },
   commitShortcuts: {
      '$default': 'tab|shift+tab|enter|ctrl+s',
      'reference': 'ctrl+s',
      'form': 'ctrl+s',
      'bool': 'tab|shift+tab|left|right|up|down|home|end|pageUp|pageDown'
   }
});
```

## Batch Edit

Use `editMethod` property to activate batch editing, this method activates cell handler that could be dragged to apply start cell value to the selected cells.

```html
<q-grid editMode="cell" editMethod="batch"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-batch/latest" %}

## Dropdown & autocomplete

To populate list of items in dropdown/autocomplete columns use `fetch` editor property. Fetch option supports next data types.

* Array of objects or basic types.
* Function that returns array of basic types/objects/observables/promises.
* Observable with an array argument.
* Promise with an array argument.

```typescript
import { of } from 'rxjs';

@Component({
    template: `
       <q-grid editMode="cell">
          <q-grid-columns>
             <q-grid-column key="number" editor="dropdown" [editorOptions]="dropdownOptions">
             </q-grid-column>
          </q-grid-columns>
       </q-grid>
    `,
})
export class MyComponent {
    dropdownOptions = {
        fetch: of([Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2])
    };
}
```

{% docEditor "github/qgrid/ng2-example/tree/column-dropdown-basic/latest" %}

## Edit Row

Use edit trigger component to show auto generated form that allows to change appropriate row data.

```html
<q-grid [rows]="rows | async" [columns]="columns" editMode="row">
    <q-grid-columns>
        <q-grid-column key="editForm" type="row-options" pin="left">
            <ng-template for="body" let-$cell>
                <q-grid-edit-form-trigger [caption]="$cell.row.name" [cell]="$cell">
                </q-grid-edit-form-trigger>
            </ng-template>
        </q-grid-column>
    </q-grid-columns>
</q-grid>
```

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

## Validation

The q-grid validation is based on language independent validation rules called LIVR. Use `q-grid-rule` component to specify which specifications should be applied to appropriate column.

```html
<q-grid editMode="cell">
    <q-grid-validation>
        <q-grid-rule for="cell" key="salary" required></q-grid-rule>
        <q-grid-rule for="cell" key="name" required [lengthBetween]="[3, 40]"></q-grid-rule>
    </q-grid-validation>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/validation-basic/latest" %}

## Suggested Links

* [LIVR](https://github.com/koorchik/LIVR)