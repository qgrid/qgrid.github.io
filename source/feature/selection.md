---
title: Selection
group: Features
order: 2
---

There are situations when you would like to enable the end user to select rows or cells in the grid table, and process data from them or make calculations based on this selection.

### Setup

To enable the selection, configure the [selection model](/doc/api/selection-model.html).

```javascript
gridModel.selection({
    unit: 'row',
    mode: 'multiple'
});
```

### Modes and Features

The q-grid provides interaction options for the user to select.

* [Single row](#Single-Row)
* [Multiple rows](#Multiple-Rows)
* Rows through their checkboxes only
* All items on a page through the select-all checkbox
* Cell range

#### Single Row

To select a row when the q-grid is in single selection mode, use either of the following approaches:

* Click the row, or
* Select the checkbox of the row.

To deselect a row when the q-grid is in single selection mode, either:

* Deselect the checkbox of the selected row, or
* Click the selected row again.

#### Multiple Rows

To select multiple rows one by one when the q-grid is in multiple selection mode, use either of the following approaches:

* Select the checkbox of each desired row, or
* Press and hold shift, and go down or up with arrow keys.

To deselect one row at a time, either:

* Deselect the checkbox of the specific row, or
* Press and hold shift, and go down or up with arrow keys.

### Example

{% docEditor "qgrid-ng-5-01-02-selection" %}

### Suggested Links

* [Selection Model](/doc/api/selection-model.html)
* [Selection View](/doc/api/selection-view.html)
