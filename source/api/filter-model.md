---
title: FilterModel
type: api
group: API
order: 95
---
A class to setup data filters and expressions.

{% docTable "source/api/filter-model.json" %}

### Usage

```javascript
gridModel.filter({
   by: {
      myTextColumn: {items: ['foo', 'bar']},
      myNumberColumn: {expression: {
		    kind: 'group',
		    op: 'and',
		    left: {
			   kind: 'condition',
			   left: key,
			   op: 'in',
			   right: ['foo', 'bar']
		   },
		   right: null
	     }}
   }
});
```

### Suggested Links

* [filter.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/filter.pipe.js)

