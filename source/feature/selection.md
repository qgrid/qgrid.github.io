---
title: Selection
group: Features
order: 7
---

There are situations when the end user need to select rows or cells in the q-grid. The q-grid provides several modes to enable selection satisfaction. 

## Setup

Use q-grid html component to setup selection options.

```html
<q-grid selectionMode="multiple" selectionUnit="column"></q-grid>
```

Or use q-grid model directly.

```javascript
gridModel.selection({
   unit: 'row',
   mode: 'single',
   area: 'custom'
});
```

## Selection modes

Use this option to control selection behavior.

* `single` mode when only one unit can be selected.
* `multiple` mode when several units can be selected. When `row` unit is chosen, `select all` checkbox is displayed in the column header.
* `range` mode when bag of units can be selected. Selection is made by mouse drag & drop.

{% docEditor "github/qgrid/ng2-example/tree/select-cell-basic/latest" %}

## Selection units

Use this option to control selection primitive.
	
* `row` unit when row can be selected by clicking on it or on the selection checkbox.
* `cell` unit when cell can be selected by clicking on it.
* `column` unit when column can be selected by clicking on it.
* `mix` unit when need to select both rows and cells, rows can be selected by clicking on the row-indicator column.

## Selection area

Use this option to control if q-grid body clicks lead to row selection.

* `body` area when click on the q-grid body leads to row selection.
* `custom` area when only check boxes are responsible for the selection.

{% docEditor "github/qgrid/ng2-example/tree/select-row-basic/latest" %}

## Selection event

Use q-grid model to get list of selected items. Note that to configure format of the selected items, selection key could be used.

```javascript
gridModel.selection({       
   key: {
      row: row => row.myId,
	  column: column => column.key
   }
});

gridModel.selectionChanged.on(e => {
   if (e.hasChanges('items')) {
       const { items } = e.state;
       const myId = items[0].row;
   }
});
```

## Coming soon

* Component selection change event.

``` html
<q-grid (selectionChange)="myHandler"></q-grid>
```

* Selection model reflecting on model data id.