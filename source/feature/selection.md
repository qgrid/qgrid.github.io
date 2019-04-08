---
title: Selection
group: Features
order: 7
---

There are situations when the end user need to select rows or cells in the q-grid, the q-grid provides several modes to enable selection satisfaction. The simples way to setup selection is to use q-grid component for more advanced use cases q-grid-model should be used..

```html
<q-grid selectionMode="multiple" 
        selectionUnit="row" 
        selectionArea="body">
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/select-row-basic/latest" %}

## Selection Changes

Use q-grid model to get list of selected items.

```typescript
import { GridComponent } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid selectionUnit="row"></q-grid>'
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.selectionChanged.on(e => {
         if (e.hasChanges('items')) {
            const { items } = e.state;
            console.log(items);
         }
      });
   }
}
```

## Selection Mode

Use this option to control selection behavior.

* `single` mode when only one unit can be selected.
* `multiple` mode when several units can be selected. When `row` unit is chosen, `select all` checkbox is displayed in the column header.
* `range` mode when bag of units can be selected. Selection is made by mouse drag & drop.

## Selection Unit

Use this option to control selection primitive.
   
* `row` unit when row can be selected by clicking on it or on the selection checkbox.
* `cell` unit when cell can be selected by clicking on it.
* `column` unit when column can be selected by clicking on it.
* `mix` unit when need to select both rows and cells, rows can be selected by clicking on the row-indicator column.

## Selection Area

Use this option to control if q-grid body clicks lead to row selection.

* `body` area when click on the q-grid body leads to row selection.
* `custom` area when only check boxes are responsible for the selection.

## How to prevent unselecting of row on click again?

Use `change` information to manipulate with logic of selection. Next lines prevent unselecting of row that was double clicked.

```typescript
model.selectionChanged.on(e => {
   const change = e.changes['items'];
   if (change) {
      const { newValue, oldValue } = change;
      if (!newValue.length) {
         model.selection({
            items: oldValue
         });
      }
   }
});
```

## How to hide column with check-boxes?

Use `[isVisible]` input of to hide/show select column.

```html
<q-grid selectionUnit="row">
   <q-grid-columns>
      <q-grid-column type="select" [isVisible]="false">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## How to select rows by id?

To override what is located in `items` property selection `key` could be overridden.

```typescript
model.selection({       
   key: {
      row: row => row.myNumberId,
      column: column => column.key
   }
});

model.selection({
   items: [0, 1, 2]
});
```