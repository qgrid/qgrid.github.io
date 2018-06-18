---
title: SortModel
type: api
group: API
order: 235
---
A class that allows to control sorting.

{% docTable "source/api/sort-model.json" %}

### Usage
```javascript
gridModel.sort({
   by: [{myColumnKey: 'asc', myOtherColumnKey: 'desc'}]
});

// In the nearest future
gridModel.sort({
   by: ['+myColumnKey', '-myOtherColumnKey']
});
```

### Suggested Links

* [Sort View](/doc/api/sort-view.html)
* [sort.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/sort.pipe.js)

