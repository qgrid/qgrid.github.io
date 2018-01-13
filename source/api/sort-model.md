---
title: SortModel
type: api
group: API
order: 214
---
A class that allows to control sorting.

{% docTable "source/api/sort-model.json" %}

## Usage
```javascript
gridModel.sort({
   by: [{myColumnKey: 'asc', myOtherColumnKey: 'desc'}]
});

// In the nearest future
gridModel.sort({
   by: ['+myColumnKey', '-myOtherColumnKey']
});
```

