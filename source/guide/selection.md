---
title: Selection
type: guide
group: Features
order: 3
---

There are situations when you would like to enable the end user to select rows or cells in the grid table, and process data from them or make calculations based on this selection.

## Setup

To enable the selection, configure the [selection model](/api/selection-model.html).
```javascript
gridModel.selection({
    unit: 'row',
    mode: 'multiple'
})
```

## Modes and Features

The q-grid provides interaction options for the user to select.

* [Single row](#Single-Row)
* [Multiple rows](#Multiple-Rows)
* Rows through their checkboxes only
* All items on a page through the select-all checkbox
* [Cell range](#cell-range)

### Single Row

To select a row when the Grid is in single selection mode, use either of the following approaches:

* Click the row, or
* Select the checkbox of the row.

To deselect a row when the Grid is in single selection mode, either:

* Deselect the checkbox of the selected row, or
* Press and hold Ctrl, and click the selected row.

### Multiple Rows

To select multiple rows one by one when the Grid is in multiple selection mode, use either of the following approaches:

* Select the checkbox of each desired row, or
* Press and hold Ctrl, and click the desired rows.

To select a range of rows when the Grid is in the multiple selection mode, either:

* Select a row through its checkbox or by clicking it, or
* Press and hold Shift and click the row you want to be the last in the range. As a result, all rows between the initially selected row and the last one are selected.

To deselect one row at a time, either:

* Deselect the checkbox of the specific row, or
* Press and hold Ctrl and click the specific row.

To leave only the current row selected and deselect all previously selected rows, click a row within the Grid.

### Cell Range


The following example demonstrates how to apply the default behavior of the select-all checkbox.