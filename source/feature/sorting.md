---
title: Sorting
type: guide
group: Features
order: 3
---

Sort a column by clicking on the column header.

## Setup

To enable the sorting, configure the[sort model](/doc/api/sort-model.html).

```javascript
gridModel.sort({
   by: [{myColumnKey: 'asc', myOtherColumnKey: 'desc'}]
});
// In the nearest future
gridModel.sort({
   by: ['+myColumnKey', '-myOtherColumnKey']
});
```

## Modes and Features

The q-grid provides interaction options for the user to sort in:

* [Ascending order](#Ascending order)
* [Descending order](#Descending order)

### Ascending order

When the sorting option is set to 'asc', the column will be sorted in ascending order.

### Descending order

When the sorting option is set to 'desc', the column will be sorted in descending order.

## Example

{% docEditor "qgrid-ng-5-01-02-selection" %}

## Suggested Links

* [Sort View](/doc/api/sort-view.html)
* [sort.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/sort.pipe.js)
