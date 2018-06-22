---
title: Selection
group: Features
order: 7
---

There are situations when the end user need to select rows or cells in the q-grid. q-grid provides several modes to enable selection satisfaction. 

```html
<q-grid selectionMode="multiple" selectionUnit="column"></q-grid>
```

Another way to setup selection is to use q-grid model directly.

```javascript
gridModel.selection({
   unit: 'row',
   mode: 'single'
});
```

## Selection modes

Option to control 

* `single` mode when only one unit can be selected.
* `multiple` mode when several units can be selected. When `row` unit is chosen, `select all` checkbox is displayed in the column header.
* `range` mode when bag of units can be selected. Selection is made by mouse drag & drop.

{% docEditor "github/qgrid/ng2-example/tree/select-cell-basic/latest" %}

## Selection units

Selection primitive.
	
* `row` user can select rows by clicking on checkboxes or q-grid body area.
* `cell` `default` user can select cells clicking on the q-grid body area.
* `column` user can select columns by clicking on the q-grid body area.
* `mix` user can select both rows and cells, rows are selectable by clicking on row-indicator column.

## Selection area

Controls if click on the q-grid body should select row or not.

* `body` click on the q-grid body leads to row select/unselect.
* `custom` only select checkbox click leads to row select/unselect.

{% docEditor "github/qgrid/ng2-example/tree/select-row-basic/latest" %}


## Selection event

List of selected items. Set of map function, that can convert column and row to nessesary format.
	 
* `column` custom column key will be stored in the items property.
* `row` custom row id will be stored in the items property.

```javascript	 
key?: {
    row: (row: any) => any,
	column?: (column: ColumnModel) => any
};
```